const jsMiniProfile = document.querySelectorAll(".js-mini-profile");
const jsUserName = document.querySelectorAll(".js-username");
const jsVolumeButton = document.getElementById("js-volume-button");

const jsImageProfile = document.querySelectorAll(".image-profile");

const jsOverlay = document.getElementById("js-overlay");
const jsBackgroundVideo = document.getElementById("js-background-video");

const bgImage = [
  "../../assets/image/background-image-one.jpg",
  "../../assets/image/background-image-two.jpg",
  "../../assets/image/background-image-three.jpg",
  "../../assets/image/background-image-four.jpg",
];
jsMiniProfile.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    jsOverlay.style.backgroundImage = `url(${bgImage[index]})`;
    jsBackgroundVideo.classList.remove("opacity-100");
    jsOverlay.classList.add("opacity-100");
    jsBackgroundVideo.classList.add("opacity-0");
    jsImageProfile[
      index
    ].src = `/assets/image/landing_page/landing-page-profile-${index + 1}.jpg`;
    jsUserName[index].classList.add("opacity-100");
  });
  item.addEventListener("mouseleave", () => {
    jsOverlay.classList.remove("opacity-100");
    jsBackgroundVideo.classList.add("opacity-100");

    jsImageProfile[index].src = `/assets/image/profile-image-${index + 1}.jpg`;
    jsUserName[index].classList.remove("opacity-100");
    jsUserName[index].classList.add("opacity-0");
  });
});

jsMiniProfile.forEach((item, index) => {
  item.addEventListener("DOMContentLoaded", () => {
    item.classList.remove("opacity-100");
  });
});

let volumePress = false;
const audio = new Audio("../../assets//music/background-music.mp3");
audio.play();
audio.volume = 0.2;
audio.loop = true;
jsVolumeButton.addEventListener("click", () => {
  if (!volumePress) {
    jsVolumeButton.classList.remove("fa-volume-high");
    jsVolumeButton.classList.add("fa-volume-xmark");
    audio.pause();
    volumePress = true;
  } else {
    jsVolumeButton.classList.remove("fa-volume-xmark");
    jsVolumeButton.classList.add("fa-volume-high");
    audio.play();
    volumePress = false;
  }
});
const text = "T H E W I R E D";
const speed = 100;
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

window.onload = () => {
  typeWriter();
};
