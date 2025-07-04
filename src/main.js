import "./scss/main.scss";
import { initSwiper } from "./components/galleryProducts";
import { createSlides } from "./modules/generateSlide";

window.addEventListener("DOMContentLoaded", async () => {
  await createSlides("/data/products.json");

  initSwiper();
});
