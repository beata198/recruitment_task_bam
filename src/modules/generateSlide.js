export async function createSlides(
  jsonPath,
  swiperSelector = ".swiper-wrapper"
) {
  const container = document.querySelector(swiperSelector);
  if (!container) return;

  try {
    const res = await fetch(jsonPath);
    const data = await res.json();

    const slidesHTML = data
      .map(
        (product) => `
      <div class="swiper-slide" lazy="true">
        <img
          src="/${product.src}"
          loading="lazy"
          alt="${product.alt}"
          width="${product.width || 200}"
          height="${product.height || 119}"
          loading="lazy"
        />
      </div>`
      )
      .join("");

    container.innerHTML = slidesHTML;
  } catch (error) {
    console.error("Error loading slides JSON:", error);
  }
}
