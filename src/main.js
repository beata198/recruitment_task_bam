import "./scss/main.scss";
import { initSwiper } from "./components/galleryProducts";
import { createSlides } from "./components/generateSlide";
import { animationForSceneIntro } from "./components/animationForSceneIntro";

let introTimeline = null;

window.addEventListener("DOMContentLoaded", async () => {
  await createSlides("/data/products.json");

  initSwiper();

  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  const widthScreen = window.innerWidth;
  const isMobile = widthScreen >= 480 && widthScreen <= 1024;

  if (!(isLandscape && isMobile)) {
    introTimeline = animationForSceneIntro();
  } else {
    introTimeline = animationForSceneIntro(true);
  }
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
