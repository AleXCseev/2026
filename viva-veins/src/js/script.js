var landingFunctions = {
  init: function () {
    this.initLibraris();
    this.time();
    this.bar();
    this.faq();
    // this.quantity();
  },

  initLibraris: function () {
    $('[href*="#"]').on("click", function (e) {
      var fixedOffset = 0;
      // var cardHeight = $("#order").outerHeight(false);
      // var windowHeight = $(window).height();

      $("html, body")
        .stop()
        .animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
      e.preventDefault();
    });

    $(".gallery__slider").owlCarousel({
      items: 2,
      margin: 20,
      dots: false,
      dotsEach: true,
      nav: true,
      loop: true,
      // stagePadding: 10,
      autoHeight: false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
        },
        720: {
          items: 2,
        },
      },
    });

    AOS.init({
      disable: function () {
        if ($(window).width() <= 1080) {
          return true;
        }
        return false;
      },
      once: true,
      duration: 1000,
      offset: 0,
    });

    $(window).resize(function () {
      AOS.refresh();
    });

    // $("[data-fancybox]").fancybox({
    //   loop: true,
    //   infobar: false,
    //   animationEffect: false,
    //   backFocus: false,
    //   hash: false,
    // });
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

    // timer();

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

    $(".date").text(getDate(-5));
    $(".date__1").text(getDate(-4));
    $(".date__2").text(getDate(-3));
    $(".date__3").text(getDate(-2));
    $(".date__4").text(getDate(-1));
  },

  bar: function () {
    const percent = [
      "20%",
      "30%",
      "40%",
      "50%",
      "40%",
      "30%",
      "20%",
      "10%",
      "20%",
      "30%",
      "40%",
      "50%",
      "20%",
      "30%",
      "40%",
      "50%",
      "40%",
      "30%",
      "20%",
      "10%",
      "20%",
      "30%",
      "40%",
      "50%",
    ];
    let currentPercent = 0;

    $(".bar__start").click(function () {
      $(this).attr("disabled", true);

      const track = $(".bar__track");

      $(".bar__info").hide();

      track.show();

      const interval = setInterval(function () {
        currentPercent++;

        if (currentPercent >= percent.length - 1) {
          clearInterval(interval);

          track.find("span").addClass("active");

          setTimeout(() => {
            finish();
          }, 3000);
        }

        // track.find("span").fadeOut(200)
        track.find("span").show().text(percent[currentPercent]);
      }, 200);
    });

    function finish() {
      $(".bar__block").slideUp(600);
      $(".order__info").slideDown(600);
      $(".order").slideDown(600);
    }
  },

  faq: function () {
    $(".faq__btn").click(function () {
      if ($(this).hasClass("active")) {
        $(this).closest(".faq__item").find(".faq__btn").removeClass("active");
        $(this).closest(".faq__item").find(".faq__text").slideUp(300);
      } else {
        $(this).addClass("active");
        $(this).closest(".faq__item").find(".faq__text").slideDown(300);
      }
    });
  },

  quantity: function () {
    var currentNumber;

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    if (localStorage.getItem("quantity")) {
      $(".quantity").text(localStorage.getItem("quantity"));
    } else {
      currentNumber = 25;
      localStorage.setItem("quantity", currentNumber);
      $(".quantity").text(currentNumber);
    }

    setInterval(function () {
      currentNumber = localStorage.getItem("quantity");
      if (currentNumber >= 3) {
        currentNumber = currentNumber - getRandomInt(3);
        $(".quantity").text(currentNumber);
        localStorage.setItem("quantity", currentNumber);
      } else {
        currentNumber = 25;
        localStorage.setItem("quantity", currentNumber);
      }
    }, 100000);
  },
};

$(document).ready(function () {
  landingFunctions.init();
});
