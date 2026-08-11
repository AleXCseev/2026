var landingFunctions = {
  init: function () {
    this.initLibraris();
    this.time();
    this.menu();
    this.bar();
  },

  initLibraris: function () {
    $('[href*="#"]').on("click", function (e) {
      var fixedOffset = 0;

      $("html, body")
        .stop()
        .animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
      e.preventDefault();
    });

     gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
          },
        },
      );
    });

    // AOS.init({
    //   disable: function () {
    //     if ($(window).width() <= 1080) {
    //       return true;
    //     }
    //     return false;
    //   },
    //   once: true,
    //   duration: 1000,
    //   offset: 0,
    // });

    // $(window).resize(function () {
    //   AOS.refresh();
    // });

    $("[data-fancybox]").fancybox({
      loop: true,
      infobar: false,
      animationEffect: false,
      backFocus: false,
      hash: false,
    });
  },

  bar: function () {
    $(".start__bar").click(function () {
      $(this).attr("disabled", true);
      $(this).removeClass("pulse");
      $(".bar__track").addClass("active");

      setTimeout(() => {
        $('[href*="#order"]').attr("href", "#form");
        $(".bar__block").slideUp();
        $(".bar__info-wrapper").slideDown();
        $(".form__wrapper").slideDown();
        $(".order__block").slideDown();
        $(".order-footer__section").slideDown();
        $("#second-order").slideDown();
      }, 10000);
    });
  },

  menu: function () {
    $(".open__btn").click(function () {
      openModal();
    });

    function openModal() {
      $(".menu").fadeIn(300);
      $("body").css("overflow", "hidden");
    }

    function closeModal() {
      $(".menu").fadeOut(300);
      $("body").css("overflow", "auto");
    }

    $(document).click(function (e) {
      const target = e.target;

      if (target.nodeName === "A") {
        closeModal();
      }

      if ($(target).hasClass("menu")) {
        closeModal();
      }

      if ($(target).hasClass("close__btn")) {
        closeModal();
      }
    });

    $(".close__btn");
  },

  video: function () {
    function initialize() {
      const owl = $(".video__block").addClass("owl-carousel").owlCarousel({
        items: 1,
        margin: 0,
        dots: true,
        dotsEach: true,
        nav: true,
        loop: true,
      });

      owl.on("translate.owl.carousel", function (e) {
        setTimeout(() => {
          $(".owl-item video").each(function () {
            $(this).get(0).pause();
          });
        }, 100);
      });

      owl.on("translate.owl.carousel", function (e) {
        setTimeout(() => {
          if ($(".owl-item.active").find("video").length !== 0) {
            $(".owl-item.active video").get(0).play();
            console.log($(".owl-item.active video").get(0));
          }
        }, 100);
      });

      var $video = $(".owl-item.active video");
      var $window = $(window);

      $window.scroll(function () {
        var $topOfVideo = $video.offset().top;
        var $bottomOfVideo = $video.offset().top + $video.outerHeight();

        var $topOfScreen = $window.scrollTop();
        var $bottomOfScreen = $window.scrollTop() + $window.innerHeight();

        if ($bottomOfScreen > $bottomOfVideo && $topOfScreen < $topOfVideo) {
          $video[0].play();
        } else {
          $video[0].pause();
        }
      });
    }

    var id;

    $(window).resize(function () {
      clearTimeout(id);
      id = setTimeout(initialize, 500);
    });

    initialize();
  },

  time: function () {
    Date.prototype.daysInMonth = function () {
      return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
    };

    if (!String.prototype.padStart) {
      String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0;
        padString = String(typeof padString !== "undefined" ? padString : " ");
        if (this.length > targetLength) {
          return String(this);
        } else {
          targetLength = targetLength - this.length;
          if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length);
          }
          return padString.slice(0, targetLength) + String(this);
        }
      };
    }

    function timer() {
      function runMultiple(hoursSelector, minutesSelector, secondsSelector, milisecondsSelector) {
        var d = new Date();
        var h = String(23 - d.getHours()).padStart(2, "0");
        var m = String(59 - d.getMinutes()).padStart(2, "0");
        var s = String(60 - d.getSeconds()).padStart(2, "0");
        // var ms = String(1000 - d.getMilliseconds()).padStart(3, "0");
        $(hoursSelector).text(h);
        $(minutesSelector).text(m);
        $(secondsSelector).text(s);
        // $(milisecondsSelector).text(ms)
      }
      setInterval(function () {
        runMultiple(".hours", ".minutes", ".seconds");
      }, 1000);
    }

    timer();

    function getDate(plusDays) {
      var now = new Date();
      now.setDate(now.getDate() + plusDays);
      var dayNum = "";
      if (now.getDate() < 10) {
        dayNum = "0";
      }
      dayNum += now.getDate();
      var monthNum = "";
      if (now.getMonth() + 1 < 10) {
        monthNum = "0";
      }
      monthNum += now.getMonth() + 1;

      return dayNum + "." + monthNum + "." + now.getFullYear();
      // return dayNum + "." + monthNum + "." + String(now.getFullYear()).substr(String(now.getFullYear()).length - 2);
    }

    // $(".date__1").text(getDate(-5));
    $(".date").text(getDate(-5));
  },
};

$(document).ready(function () {
  landingFunctions.init();
});
