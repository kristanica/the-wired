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

const accessToken = "3676a25fcba4aabddfa387ad85e6bca1";

const image = {
  Paramore: "../assets/image/leewell/awkif.png",
  Bente: "../assets/image/leewell/bente.jpg",
  Katabi: "../assets/image/leewell/Katabi.png",
  Tampo: "../assets/image/leewell/Tampo.jpg",
};

const awkif = ["Franklin", "Conspiracy", "My Heart", "O Star", "All We Know"];
const riot = [
  "Misery Business",
  "crushcrushcrush",
  "That's What You Get",
  "When It Rains",
];
const tcfsr = ["The Ghost of You", "Helena"];
const specialTracks = {
  "My Own Summer (Shove It)": "../assets/image/leewell/minusBlindfold.jpg",
  "Pag-Ibig ay Kanibalismo II": "../assets/image/leewell/fitterkarma.png",
  "Minus Blindfold": "../assets/image/leewell/minusBlindfold.jpg",
  wednesday: "../assets/image/leewell/wednesday.jpg",
  Decode: "../assets/image/leewell/decode.png",
  "Still Into You": "../assets/image/leewell/selftitled.png",
};

const username = "kristanica";
const getTrack = async () => {
  try {
    const res = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${accessToken}&format=json&limit=20`
    );

    const playlist = await res.json();
    console.log(playlist);

    const container = document.querySelector(".displayTrack");

    playlist.toptracks.track.forEach((track) => {
      let src = null;

      src = image[track.name];
      if (awkif.includes(track.name)) {
        src = "../assets/image/leewell/awkif.png";
      } else if (riot.includes(track.name)) {
        src = "../assets/image/leewell/riot.jpg";
      } else if (tcfsr.includes(track.name)) {
        src = "../assets/image/leewell/tcwfr.jpg";
      } else if (specialTracks[track.name]) {
        src = specialTracks[track.name];
      }

      container.innerHTML += `
       <div style="display:flex; align-items:center; margin-bottom: 20px; gap: 20px;">
  <img src="${src}" 
       alt="${track.name}" 
       style="height: 100px; width: 100px; object-fit: cover;" />
  
  <div>
    <p style="margin: 0;">RANK: ${track["@attr"].rank}</p>
        <p style="color: white; font-weight: 900; margin: 5px 0;">
      Track Name: ${track.playcount} </p>
    <p style="color: white; font-weight: 900; margin: 5px 0;">
      Track Name: 
      <a href="${track.url}" target="_blank" rel="noopener noreferrer" style="color: #1DB954;">
        ${track.name}
      </a>
    </p>
    
    <p style="margin: 0;">
      Artist: 
      <a href="${track.artist.url}" target="_blank" rel="noopener noreferrer" style="color: purple;">
        ${track.artist.name}
      </a>
    </p>
  </div>
</div>
      `;
    });
  } catch (error) {
    console.error("Error fetching playlist:", error);
  }
};

const currentlyPlaying = document.getElementById("currentlyPlaying");
const recent = document.getElementById("recent");

const getRecentScrobble = async () => {
  try {
    const res = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${accessToken}&format=json&limit=5`
    );

    const data = await res.json();

    const recentTrack = data.recenttracks.track;

    currentlyPlaying.innerHTML = `
    

    <div class ="flex items-center ">
    <img src="${recentTrack[0].image[1]["#text"]}" class ="h-24 w-24"/>

    <div class ="flex flex-col ml-2">
   <p class ="font-bold">${recentTrack[0].name} <i class="fa-solid fa-music"></i></p>
     <p class ="font-light opacity-50">${recentTrack[0].artist["#text"]}</p>
    </div>
  
    </div>`;

    recentTrack.forEach((item) => {
      recent.innerHTML += `
      <li>
      <span class="text-green-300 font-bold animate-pulse"
      >[TR1]:</span>
      ${item.name}
      </li>
`;
    });
  } catch (error) {}
};

getTrack();

getRecentScrobble();

window.onload = () => {
  typeWriter();
};
