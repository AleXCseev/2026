var landingFunctions = {
  init: function () {
    this.initLibraris();
    this.time();
    this.price();
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
      const p = parseInt($(this).text());
      const currency = $(this).text().replace(/[0-9]/g, "");
      price = (p * 100) / 10;
      p2 = Math.ceil(price);
      const result = p2 - p
      $(".result").text(result + " " + currency)
      $(this)
        .closest(".price")
        .find(".old__price")
        .text(p2 + " " + currency);
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
    $(".date").text(getDate(-2));
  },

  bar: function () {
    const wheel = document.querySelector(".bar img");
    const resultWrapper = document.querySelector(".card__block");

    $(".start").click(function () {
      if (wheel.classList.contains("rotated")) {
        // resultWrapper.style.display = "block";
        return false;
      } else {
        wheel.classList.add("super-rotation");
        setTimeout(function () {
          $(".bar__block").slideUp(1000);
          $(".card__block").slideDown(1000);
          start_timer();
        }, 8000);
        setTimeout(function () {
          $(".card__decor img").addClass("active");
        }, 9000);
        wheel.classList.add("rotated");
      }
    });

    var time = 600;
    var intr;

    function start_timer() {
      intr = setInterval(tick, 1000);
    }

    function tick() {
      time = time - 1;
      var mins = Math.floor(time / 60);
      var secs = time - mins * 60;
      if (mins == 0 && secs == 0) {
        clearInterval(intr);
      }
      secs = secs >= 10 ? secs : "0" + secs;
      mins = mins >= 10 ? mins : "0" + mins;
      $("#min").html(mins);
      $("#sec").html(secs);
    }
  },
};

$(document).ready(function () {
  landingFunctions.init();
});
