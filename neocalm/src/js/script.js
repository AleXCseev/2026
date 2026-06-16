const landingFunctions = {
  init: function () {
    this.initLibraris();
    this.time();
    this.faq();
    this.fixed();
  },

  initLibraris: function () {
    $('[href*="#"]').on("click", function (e) {
      const fixedOffset = 0;
      const cardHeight = $("#order").outerHeight(false);
      const windowHeight = $(window).height();

      $("html, body")
        .stop()
        .animate({ scrollTop: $(this.hash).offset().top + fixedOffset + (cardHeight - windowHeight) }, 1000);
      e.preventDefault();
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

    $("[data-fancybox]").fancybox({
      loop: true,
      infobar: false,
      animationEffect: false,
      backFocus: false,
      hash: false,
    });
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
    // $(".date").text(getDate(2));
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

  fixed: function () {
    const $fixedEl = $(".fixed");
    const $targetZones = $(".header__card");

    if ($fixedEl.length && $targetZones.length) {
      const fixedElHeight = $fixedEl.outerHeight();
      const isTopFixed = $fixedEl.css("top") !== "auto";
      const fixedTopOffset = isTopFixed ? parseInt($fixedEl.css("top"), 10) || 0 : 0;

      $(window).on("scroll.multiHide", function () {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        const currentCheckPoint = isTopFixed ? scrollTop + fixedTopOffset + fixedElHeight : scrollTop + windowHeight;
        let shouldHide = false;

        $targetZones.each(function () {
          const $zone = $(this);
          const zoneTop = $zone.offset().top;
          const zoneBottom = zoneTop + $zone.outerHeight();

          if (currentCheckPoint >= zoneTop && scrollTop <= zoneBottom) {
            shouldHide = true;
            return false;
          }
        });

        if (shouldHide) {
          $fixedEl.slideUp(300);
        } else {
          $fixedEl.slideDown(300);
        }
      });

      $(window).trigger("scroll.multiHide");
    }
  },
};

$(document).ready(function () {
  landingFunctions.init();
});
