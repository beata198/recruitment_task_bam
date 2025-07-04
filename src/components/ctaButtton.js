import { gsap } from "gsap";
import eventTracking from "./eventTracking";

export function initCtaButton(btnID = "learnMoreBtn") {
  const btn = document.getElementById(btnID);
  if (!btn) return;

  gsap.to(btn, {
    scale: 1.025,
    duration: 0.8,
    repeat: -1,
    yoyo: true,
  });

  //EVENT TRACKING - after clicking the CTA button
  btn.addEventListener("click", () => {
    eventTracking("user_interactions: cta click");
  });
}
