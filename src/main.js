import "./scss/main.scss";
import eventTracking from "./modules/eventTracking";
import { initCtaButton } from "./components/ctaButtton";
import { initSwiper } from "./components/galleryProducts";
import { createSlides } from "./modules/generateSlide";
import { animationForSceneIntro } from "./modules/animationForSceneIntro";

//EVENT TRACKING - when the page has loaded
window.addEventListener("load", () => {
  eventTracking("ad_load");
});

//EVENT TRACKING - every time the browser window is resized
window.addEventListener("resize", () => {
  eventTracking("window_resize");
});

//EVENT TRACKING - when the user leaves the page (e.g., switches tabs) / and change the title
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    eventTracking("page_hide");
    document.title = "😥 Come back....";
  } else {
    document.title = "Recruitment task | Junior Frontend Developer";
  }
});

let introTimeline = null;

window.addEventListener("DOMContentLoaded", async () => {
  await createSlides("/data/products.json");

  initCtaButton();
  initSwiper();

  // const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  // const widthScreen = window.innerWidth;
  // const isMobile = widthScreen >= 480 && widthScreen <= 1024;

  // if (!(isLandscape && isMobile)) {
  //   // introTimeline = animationForSceneIntro();
  // } else {
  //   introTimeline = animationForSceneIntro(true);
  // }
});

const checkDeviceOrientation = () => {
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  const widthScreen = window.innerWidth;
  const isMobile = widthScreen >= 480 && widthScreen <= 1024;

  const overlay = document.getElementById("overlay");
  const header = document.getElementById("logo");
  const main = document.getElementById("app");

  if (isLandscape && isMobile) {
    if (introTimeline && typeof introTimeline.kill === "function") {
      introTimeline.kill();
      // introTimeline = null;
    }

    overlay.innerHTML = `
        <img src="/assets/rotate_phone.gif" alt="Obróć urządzenie" style="width: 100px; margin-bottom: 20px;" />
        <p>Bitte drehe dein Handy ins Hochformat, um fortzufahren.</p>
      `;
    header.style.display = "none";
    main.style.display = "none";
  } else {
    header.style.display = "block";
    main.style.display = "flex";
    overlay.innerHTML = "";

    if (!introTimeline || typeof introTimeline.restart !== "function") {
      introTimeline = animationForSceneIntro();
    } else {
      introTimeline.restart();
    }
  }
};

window.addEventListener("orientationchange", checkDeviceOrientation);
window.addEventListener("resize", checkDeviceOrientation);
window.addEventListener("load", checkDeviceOrientation);
