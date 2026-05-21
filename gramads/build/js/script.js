var landingFunctions = {
  init: function () {
    this.initLibraris();
    this.spincrement();
    this.tab();
    // this.time();
    // this.bar();
    // this.faq();
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

    // $("[data-fancybox]").fancybox({
    //   loop: true,
    //   infobar: false,
    //   animationEffect: false,
    //   backFocus: false,
    //   hash: false,
    // });
  },

  spincrement: function () {
    var show = true;
    var countbox = ".advantage__section";
    $(window).on("scroll load resize", function () {
      if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height = $(window).height(); // Высота окна браузера
      var d_height = $(document).height(); // Высота всего документа
      var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
      if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
        $(".advantage__title").css("opacity", "1");
        $(".advantage__title span").spincrement({
          thousandSeparator: "",
          duration: 3000,
        });

        show = false;
      }
    });
  },

  tab: function () {
    $(".forma__btn").click(function () {
      if ($(this).hasClass("active")) return;

      const activeTab = $(this).data("tab");
      $(".forma__btn").removeClass("active");
      $(this).addClass("active");

      $(".format__tab").slideUp(300);
      $(".tab__" + activeTab).slideDown(300);
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

  bar: function () {
    $(".bar__start").click(function () {
      $(".bar__track").addClass("active");

      setTimeout(() => {
        $(".result").fadeIn(300);
        $(".order__bar").css("opacity", 0);
      }, 6000);

      setTimeout(() => {
        $(".result").fadeOut(300);
        $(".order__bar").hide();
        $(".order__content").fadeIn(300);
      }, 8000);
    });
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
};

$(document).ready(function () {
  landingFunctions.init();
});
