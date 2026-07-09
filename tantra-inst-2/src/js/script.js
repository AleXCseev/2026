var landingFunctions = {
  init: function () {
    this.initLibraris();
    this.nav();
    this.review();
    this.reels();
    this.order();
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
  },

  order: function () {
    $(".order__form-btn").click(function () {
      const current = $(this).data("count");
      $(".order__form-btn").removeClass("active");
      $(this).addClass("active");
    });
  },
};

$(document).ready(function () {
  landingFunctions.init();
});
