var landingFunctions = {
  init: function () {
    this.initLibraris();
    this.clock();
    this.time();
    this.price();
    // this.modal();
  },

  initLibraris: function () {
    $('[href*="#"]').on("click", function (e) {
      var fixedOffset = 0;

      $("html, body")
        .stop()
        .animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
      e.preventDefault();
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

    $("[data-fancybox]").fancybox({
      loop: true,
      infobar: false,
      animationEffect: false,
      backFocus: false,
      hash: false,
    });
  },

  price: function () {
    $(".new__price").each(function () {
      let p = parseInt($(this).text());
      const currency = $(this).text().replace(/[0-9]/g, "");
      p = (p * 100) / 10;
      p2 = Math.ceil(p);
      $(this)
        .closest(".price")
        .find(".old__price")
        .text(p2 + " " + currency);
    });
  },

  clock: function () {
    function updateClock() {
      const now = new Date();
      const ms = now.getMilliseconds();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const steppedMs = Math.floor(ms / (1000 / 3)) * (1000 / 3);
      const preciseSeconds = seconds + steppedMs / 1000;

      const secondsDegree = (preciseSeconds / 60) * 360;
      const minutesDegree = ((minutes + seconds / 60) / 60) * 360;
      const hoursDegree = (((hours % 12) + minutes / 60) / 12) * 360;

      $(".seconds__arrow").css("transform", `rotate(${secondsDegree}deg)`);
      $(".minutes__arrow").css("transform", `rotate(${minutesDegree}deg)`);
      $(".hours__arrow").css("transform", `rotate(${hoursDegree}deg)`);
    }

    setInterval(updateClock, 33);

    updateClock();
  },

  time: function () {
    Date.prototype.daysInMonth = function () {
      return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
    };

    if (!String.prototype.padStart) {
      String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
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

      // return dayNum + "." + monthNum + "." + now.getFullYear();
      return dayNum + "." + monthNum + "." + String(now.getFullYear()).substr(String(now.getFullYear()).length - 2);
    }

    // $(".date__1").text(getDate(-5));
    $(".date").text(getDate(2));
  },

  modal: function () {
    $(".add__review").click(function () {
      $(".modal__review").addClass("active");
    });

    function close() {
      $(".modal__review").removeClass("active");
    }

    $(".modal__review").click(function (e) {
      var target = e.target;
      if (target.classList.contains("modal__close")) {
        close();
      }
      if (target.classList.contains("modal")) {
        close();
      }
    });

    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        console.log(reader);
        reader.onload = function (e) {
          $(".file img").attr("src", e.target.result).css("display", "block");
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    $(".modal__review .input__file").on("change", function () {
      readURL(this);
    });

    $(".modal__review form").submit(function (e) {
      e.preventDefault();
      $(this).removeClass("active");
      $(".send__window").addClass("active");
      $(".modal__review .name__input").val("");
      $(".modal__review .modal__area").val("");
      $(".modal__review .file img").attr("src", "").css("display", "none");
      delayClose();
    });
    function delayClose() {
      setTimeout(function () {
        $(".modal__review form").addClass("active");
        $(".send__window").removeClass("active");
        close();
      }, 5000);
    }
  },
};

$(document).ready(function () {
  landingFunctions.init();
});
