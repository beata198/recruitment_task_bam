import { gsap } from "gsap";
import eventTracking from "./eventTracking";

export function animationForSceneIntro(pause = false) {
  const introLoading = document.getElementById("logo");
  const overlay = document.getElementById("overlay");
  const tl = gsap.timeline({ paused: pause });

  introLoading.style.display = "block";

  // EVENT TRACKING - scene 1 becomes visible
  tl.call(() => {
    eventTracking("scene_change", "intro");
  });

  tl.fromTo(
    introLoading,
    { opacity: 0, scale: 0.7 },
    { opacity: 1, scale: 1.1, duration: 3 }
  );
  tl.to(introLoading, {
    top: "2em",
    left: "2rem",
    transform: "translate(0, 0)",
    duration: 3,
    ease: "power2.out",
  });
  tl.to(overlay, {
    x: "-100vw",
    // y: "-100vh",
    duration: 3,
  });
  tl.to(
    introLoading,
    {
      backgroundColor: "transparent",
      duration: 1,
      delay: 1,
    },
    "<"
  );

  tl.to(
    overlay,
    {
      display: "none",
      duration: 3,
    },
    "<"
  );

  // EVENT TRACKING - scene 2 becomes visible
  tl.call(() => {
    eventTracking("scene_change", "gallery");
  });

  return tl;
}
