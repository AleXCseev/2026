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

    $(".doctor__slider").owlCarousel({
      items: 2,
      margin: 14,
      dots: false,
      dotsEach: true,
      nav: false,
      loop: true,
      stagePadding: 10,
      // autoHeight: true,
      // autoplay: true,
      // autoplayTimeout: 5000,
      // autoplayHoverPause: true,
      // responsive: {
      //   0: {
      //     items: 1,
      //   },
      //   1081: {
      //     items: 2,
      //   },
      //   1481: {
      //     items: 3,
      //   },
      // },
    });

    // $(".advantage__slider").owlCarousel({
    //   items: 4,
    //   margin: 11,
    //   dots: false,
    //   dotsEach: true,
    //   nav: false,
    //   loop: true,
    //   autoWidth: true,
    //   stagePadding: 10,
    // });

    $(".review__slider").owlCarousel({
      items: 3,
      margin: 12,
      dots: false,
      dotsEach: true,
      nav: false,
      loop: true,
      // autoHeight: true,
      // autoplay: true,
      // autoplayTimeout: 5000,
      // autoplayHoverPause: true,
      // responsive: {
      //   0: {
      //     items: 1,
      //   },
      //   1081: {
      //     items: 2,
      //   },
      //   1481: {
      //     items: 3,
      //   },
      // },
    });

    $("[data-fancybox]").fancybox({
      loop: true,
      infobar: false,
      animationEffect: false,
      backFocus: false,
      hash: false,
    });
  },

  nav: function () {
    $(".nav").sticky({});

    $(document).on("click", ".nav__trigger", function () {
      $("body").css("overflow", "auto");
      if ($(this).hasClass("active")) return;

      const id = $(this).data("id");

      $(".section").removeClass("active");
      $("#" + id).addClass("active");
      $("html, body").animate({ scrollTop: 0 }, "smooth");
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
      console.log("click");
      const id = $(this).data("slide");

      owl.trigger("to.owl.carousel", [+id - 1, 0]);
    });
  },

  reels: function () {
    $(".reels__slider").owlCarousel({
      items: 1,
      margin: 0,
      dots: true,
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

  modal: function () {
    let currentStories = 1;

    $(".open__modal").click(function () {
      const id = $(this).data("modal");

      $("#modal-" + id).fadeIn(300);

      $(`[data-stories="1"]`).show();
      currentStories = 1;

      $("body").css("overflow", "hidden");
    });

    $(".modal").swipe({
      swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        if (currentStories === 1 && direction === "left") {
          if ($(this).find(`[data-stories="2"]`).length) {
            currentStories = 2;
            $(this).find(`[data-stories="1"]`).fadeOut(300);
            $(this).find(`[data-stories="2"]`).fadeIn(300);
          }
          return;
        }
        if (currentStories === 2 && direction === "right") {
          currentStories = 1;
          $(this).find(`[data-stories="1"]`).fadeIn(300);
          $(this).find(`[data-stories="2"]`).fadeOut(300);
          return;
        }
      },
    });

    $(".modal__close").click(function () {
      $(".modal").fadeOut(300);
      $("body").css("overflow", "auto");
    });
  },
};

$(document).ready(function () {
  landingFunctions.init();
});
