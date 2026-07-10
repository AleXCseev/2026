var landingFunctions = {
  init: function () {
    this.initLibraris();
    this.nav();
    this.story();
    this.review();
    this.reels();
    this.timer();
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

    $(".stories__slider").owlCarousel({
      items: 2,
      margin: 13,
      dots: false,
      dotsEach: true,
      nav: false,
      loop: true,
    });

    $(".doctor__slider").owlCarousel({
      items: 2,
      margin: 14,
      dots: false,
      dotsEach: true,
      nav: false,
      loop: true,
      // stagePadding: 10,
    });

    $(".review__slider").owlCarousel({
      items: 3,
      margin: 12,
      dots: false,
      dotsEach: true,
      nav: false,
      loop: true,
    });

    $(".video__slider").owlCarousel({
      items: 3,
      margin: 12,
      dots: false,
      dotsEach: true,
      nav: false,
      loop: true,
    });

    
  },

  nav: function () {
    // $(".nav").sticky({});

    function changePage(id) {
      $("body").css("overflow", "auto");
      history.pushState({ page: "virtual" }, "", "#" + id);

      $(".section").removeClass("active");
      $("#" + id).addClass("active");
      $("html, body").animate({ scrollTop: 0 }, "smooth");

      $("video").each(function () {
        this.pause();
      });
    }

    $(document).on("click", ".nav__trigger", function () {
      if ($(this).hasClass("active")) return;

      const id = $(this).data("id");

      changePage(id);
    });

    $(window).on("popstate", function (event) {
      const state = event.originalEvent.state;
      const id = "home";

      changePage(id);
    });
  },

  story: function () {
    
    const owl = $(".story__slider").owlCarousel({
      items: 1,
      margin: 10,
      dots: true,
      dotsEach: true,
      nav: false,
      loop: true,
      autoHeight: true,
    });

    $(document).on("click", ".slide__trigger", function () {
      const id = $(this).data("slide");

      owl.trigger("to.owl.carousel", [+id - 1, 0]);
    });

    owl.on('changed.owl.carousel', function(event) {
      $("html, body").animate({ scrollTop: 0 }, 0);
    })
  },

  review: function () {
    const owl = $(".review__section-slider").owlCarousel({
      items: 1,
      margin: 0,
      dots: true,
      dotsEach: true,
      nav: false,
      loop: true,
    });

    $(document).on("click", ".review__trigger", function () {
      const id = $(this).data("slide");

      owl.trigger("to.owl.carousel", [+id - 1, 0]);
    });
  },

  reels: function () {
     $(".reels__slider").owlCarousel({
      items: 3,
      margin: 12,
      dots: false,
      dotsEach: true,
      nav: false,
      loop: true,
    });

    const owl = $(".reels__section-slider").owlCarousel({
      items: 1,
      margin: 10,
      dots: false,
      dotsEach: true,
      nav: false,
      loop: true,
    });

    $(document).on("click", ".reels__trigger", function () {
      const id = $(this).data("slide");

      owl.trigger("to.owl.carousel", [+id - 1, 0]);
    });
  },

  timer: function () {
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
  },
};

$(document).ready(function () {
  landingFunctions.init();
});
