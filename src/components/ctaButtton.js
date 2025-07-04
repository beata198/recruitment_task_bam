import { gsap } from "gsap";

export function initCtaButton(btnID = "learnMoreBtn") {
  const btn = document.getElementById(btnID);
  if (!btn) return;

  gsap.to(btn, {
    scale: 1.025,
    duration: 0.8,
    repeat: -1,
    yoyo: true,
  });
}
