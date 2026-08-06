var landingFunctions = {
  init: function () {
    this.initLibraris();
    this.theme();
    this.spincrement();
    this.menu();
    this.sign();
    this.tab();
    this.faq();
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

    const chartContainer = document.querySelector("#animatedChart");
    const path = document.querySelector("#animated-path");

    const pathLength = path.getTotalLength();
    
    chartContainer.style.setProperty('--path-length', pathLength);

    const observerOptions = {
        root: null,
        threshold: 0.3 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                chartContainer.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(chartContainer);

    AOS.init({
      // disable: function () {
      //   if ($(window).width() <= 1080) {
      //     return true;
      //   }
      //   return false;
      // },
      once: false,
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

  theme: function () {
    if (localStorage.getItem("theme") === "dark") {
      $("body").addClass("dark-theme");
    }
    $("#theme-toggle").on("click", function () {
      $("body").toggleClass("dark-theme");

      if ($("body").hasClass("dark-theme")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  },

  menu: function () {
    function bodyOverflowHidden() {
      $("body").css("overflow", "hidden");
    }

    function bodyOverflowAuto() {
      $("body").css("overflow", "auto");
    }

    $("#open-menu").click(function () {
      $("#menu").addClass("active");
      $("#sign").removeClass("active");
      bodyOverflowHidden();
    });

    $("#close-menu").click(function () {
      $("#menu").removeClass("active");
      bodyOverflowAuto();
    });

    $(".menu__list").click(function (e) {
      $("#menu").removeClass("active");
      bodyOverflowAuto();
    });

    $(".signin").click(function () {
      $("#sign").addClass("active");
      $("#menu").removeClass("active");
      $(".sign__btn-enter").click();
      bodyOverflowHidden();
    });

    $("#close-sign-menu").click(function () {
      $("#sign").removeClass("active");
      bodyOverflowAuto();
    });
  },

  sign: function () {
    $(".sign__trigger").click(function () {
      const signItem = $(this).data("sign");

      $(".sign__btn").removeClass("active");
      $(".sign__btn-" + signItem).addClass("active");

      $(".sign__info").removeClass("active");
      $(".sign__info-" + signItem).addClass("active");
      $(".sign__form").removeClass("active");
      $("." + signItem).addClass("active");
    });
  },

  spincrement: function () {
    var show = true;
    var countbox = ".header__items";
    $(window).on("scroll load resize", function () {
      if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height = $(window).height(); // Высота окна браузера
      var d_height = $(document).height(); // Высота всего документа
      var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
      if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
        $(".header__item h3").css("opacity", "1");
        $(".header__item h3 span").spincrement({
          thousandSeparator: "",
          duration: 3000,
        });

        show = false;
      }
    });
  },

  tab: function () {
    $(".format__btn").click(function () {
      if ($(this).hasClass("active")) return;

      const activeTab = $(this).data("tab");
      $(".format__btn").removeClass("active");
      $(this).addClass("active");

      $(".format__tab-wrapper").slideUp(300);
      $(".tab__" + activeTab).slideDown(300);
    });
  },

  faq: function () {
    $(".faq__btn").click(function () {
      if ($(this).closest(".faq__item").hasClass("active")) {
        $(this).closest(".faq__item").removeClass("active");
        $(this).closest(".faq__item").find(".faq__item-text").slideUp(300);
      } else {
        $(this).closest(".faq__item").addClass("active");
        $(this).closest(".faq__item").find(".faq__item-text").slideDown(300);
      }
    });
  },
};

$(document).ready(function () {
  landingFunctions.init();
});
