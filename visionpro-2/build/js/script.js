var landingFunctions = {
  init: function () {
    this.initLibraris();
    this.time();
    this.quantity();
  },

  initLibraris: function () {
    $('[href*="#"]').on("click", function (e) {
      var fixedOffset = 0;
      var cardHeight = $("#order").outerHeight(false);
      var windowHeight = $(window).height();

      $("html, body")
        .stop()
        .animate({ scrollTop: $(this.hash).offset().top + fixedOffset + (cardHeight - windowHeight) }, 1000);
      e.preventDefault();
    });

    $(".info__slider").owlCarousel({
      items: 3,
      margin: 20,
      dots: false,
      dotsEach: true,
      nav: false,
      loop: true,
      // autoplay: false,
      // autoplayTimeout: 5000,
      // autoplayHoverPause: true,
      responsive: {
        0: {
          items: 2,
        },
        1081: {
          items: 3,
        },
      },
    });

    $(".video__slider").owlCarousel({
      items: 3,
      margin: 20,
      dots: false,
      dotsEach: true,
      nav: false,
      loop: true,
      // autoplay: false,
      // autoplayTimeout: 5000,
      // autoplayHoverPause: true,
      responsive: {
        0: {
          items: 2,
        },
        700: {
          items: 3,
        },
      },
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
    $(".header__date").text(getDate(-2));
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
