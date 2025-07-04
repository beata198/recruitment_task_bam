import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import eventTracking from "../modules/eventTracking";
import { displayVideo } from "./displayVideo";

export function initSwiper() {
  const swiper = new Swiper(".swiper", {
    modules: [Navigation, Pagination],
    slidesPerView: 2,
    loop: true,
    spaceBetween: 32,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      700: {
        slidesPerView: 3,
      },
      991: {
        slidesPerView: 4,
      },
    },
  });

  swiper.on("click", (e) => {
    const clickedSlide = e.clickedSlide;

    if (!clickedSlide) return;

    const dataIndex = +clickedSlide.getAttribute("data-swiper-slide-index") + 1;

    // EVENT TRACKING - after clicking a slide in the gallery
    eventTracking("user_interaction:slide_click", dataIndex);

    if (dataIndex % 4 === 1) {
      displayVideo("top-left");

      // EVENT TRACKING - scene 3 becomes visible
      eventTracking("scene_change:video");
    } else if (dataIndex % 4 === 2) {
      displayVideo("top-right");

      // EVENT TRACKING - scene 3 becomes visible
      eventTracking("scene_change:video");
    } else if (dataIndex % 4 === 3) {
      displayVideo("bottom-left");

      // EVENT TRACKING - scene 3 becomes visible
      eventTracking("scene_change:video");
    } else {
      displayVideo("bottom-right");

      // EVENT TRACKING - scene 3 becomes visible
      eventTracking("scene_change:video");
    }
  });
}
