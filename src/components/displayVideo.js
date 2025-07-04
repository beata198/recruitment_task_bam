export function displayVideo(position) {
  const video = document.getElementById("rabbitAdvertisement");

  const validPositions = [
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
  ];

  if (
    !position ||
    typeof position !== "string" ||
    !validPositions.includes(position)
  ) {
    video.style.display = "none";
    return;
  }
  video.style.top = "";
  video.style.bottom = "";
  video.style.left = "";
  video.style.right = "";
  video.style.display = "inline";
  video.play();

  // const sides = position.split("-");

  position.split("-").forEach((side) => (video.style[side] = 0));
}
