const bgImages = [
  "../assets/image/leewell/carousel/leewell-1.jpg",
  "../assets/image/leewell/carousel/leewell-2.jpg",
  "../assets/image/leewell/carousel/leewell-3.jpg",
];

const quotes = [
  "No boundaries between self and signal.",
  "Reality hums, distorted by static.",
  "Are you connected, or are you alone?",
  "Identity is just another protocol.",
  "Even silence leaves data behind.",
];

const carousel = document.getElementById("image-carousel");
const continueButton = document.getElementById("js-continue-button");
const closeButton = document.getElementById("js-close-button");
const mainContainer = document.getElementById("js-main-container");
const showButton = document.getElementById("js-show-container");
const convoBox = document.querySelectorAll(".js-convo-box");
const carouselContainer = document.getElementById("js-carousel-container");
const ecert = document.querySelectorAll(".ecert");
const closeModalButton = document.getElementById("closeModal");
const jsHome = document.getElementById("js-home");

if (jsHome) {
  carouselContainer.classList.add("hidden");
}

const modal = document.getElementById("modal");

closeModalButton.addEventListener("click", () => {
  console.log("test");
  modal.classList.remove("opacity-100");
  modal.classList.add("opacity-0", "pointer-events-none");
});

ecert.forEach((item) =>
  item.addEventListener("click", () => {
    modal.classList.remove("opacity-0", "pointer-events-none");
    modal.classList.add("opacity-100");

    document.getElementById("js-modal-content").src = item.src;
  })
);

closeButton.addEventListener("click", () => {
  mainContainer.classList.remove("opacity-100");
  mainContainer.classList.add("opacity-0");

  setTimeout(() => {
    mainContainer.classList.add("hidden");
  }, 700);
}),
  showButton.addEventListener("click", () => {
    mainContainer.classList.remove("hidden");

    setTimeout(() => {
      mainContainer.classList.remove("opacity-0");
      mainContainer.classList.add("opacity-100");
    }, 20);
  });
continueButton.addEventListener("click", () => {
  document.getElementById("js-connection-container").classList.add("hidden");
  document.getElementById("js-home-container").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("js-home-container").classList.add("opacity-100");
  }, 50);
});

const containers = document.querySelectorAll(".js-tab");

const navButtons = document.querySelectorAll("li");
navButtons.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (containers[index].classList.contains("flex")) {
      return;
    }
    containers.forEach((item, index) => {
      item.classList.remove("flex");
      item.classList.add("hidden");
    });
    if (index === 1 || index === 0) {
      carouselContainer.classList.add("hidden");
    } else {
      carouselContainer.classList.remove("hidden");
    }

    containers[index].classList.remove("hidden");
    containers[index].classList.add("flex");

    if (index === 3) {
      convoBox.forEach((c, i) => {
        setTimeout(() => {
          c.classList.remove("opacity-0");
          c.classList.add("opacity-100");
        }, 1000 * i);
      });
    }
  });
});

containers.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    if (item.classList.contains("flex")) {
      return;
    }
  });
});

let i = 0;

carousel.style.backgroundImage = `url(${bgImages[i]})`;

setInterval(() => {
  setTimeout(() => {
    i = (i + 1) % bgImages.length;
    carousel.style.backgroundImage = `url(${bgImages[i]})`;
  }, 500);
}, 4000);

const text = "SERIAL EXPERIMENTS";
const speed = 100;
let x = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").textContent += text.charAt(x);
    x++;
    setTimeout(typeWriter, speed);
  }
}

let y = 0;
setInterval(() => {
  y = (y + 1) % bgImages.length;

  document.getElementById("js-quotes").textContent = quotes[y];
}, 4000);

// window.addEventListener("beforeunload", () => {
//   localStorage.setItem("scrollY", window.scrollY);
// });

// window.addEventListener("load", () => {
//   const scrollY = localStorage.getItem("scrollY");
//   if (scrollY) window.scrollTo(0, parseInt(scrollY));
// });
window.onload = () => {
  typeWriter();
};
