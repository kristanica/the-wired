//Palitan nyo ng sarili nyong image kung gusto nyo ikeep yung image carousel
const bgImages = [
  "../assets/image/Mike/AcIIMike.png",
  "../assets/image/Mike/ProfilePic.jpg",
  "../assets/image/Mike/AcIIMike.png",
];


//Eto yung nag loop na qutoes sa baba ng carousel
const quotes = [
  "StarBoy",
  "Die For you",
  "Out of Time",
  "After Hours",
];

const carousel = document.getElementById("image-carousel");
const continueButton = document.getElementById("js-continue-button");
const closeButton = document.getElementById("js-close-button");
const mainContainer = document.getElementById("js-main-container");
const showButton = document.getElementById("js-show-container");
const convoBox = document.querySelectorAll(".js-convo-box");
const carouselContainer = document.getElementById("js-carousel-container");

const containers = document.querySelectorAll(".js-tab");
const navButtons = document.querySelectorAll("li");
navButtons.forEach((item, index) => {
  item.addEventListener("click", () => {
    // switch tabs
    containers.forEach((item) => {
      item.classList.remove("flex");
      item.classList.add("hidden");
    });
    containers[index].classList.remove("hidden");
    containers[index].classList.add("flex");

    // Trigger Dota API when API tab is opened (assuming it's tab index 3)
    if (index === 4) {
      loadDotaProfile();
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

//eto yung nag gglitch na text, feel free to remove/change
const text = "Beyond the Wall";
const speed = 100;
let x = 0;

function typeWriter() {
  if (x < text.length) {   
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

window.onload = () => {
  typeWriter();
};


document.addEventListener("DOMContentLoaded", () => {
  const text = `I am Mike, a 4th-year BSIT student at Tarlac State University,\n majoring in Web and Mobile Applications.`;
    const el = document.getElementById("typewriter-text"); // single element
  el.innerHTML = ""; // clear text
  let i = 0;

  function type() {
    if (i < text.length) {
      // add <br> instead of raw newline
      const char = text[i] === "\n" ? "<br>" : text[i];
      el.innerHTML += char;
      i++;
      setTimeout(type, 50); // adjust speed for long text
    }
  }

  type();
});

  function showCertificate(imageSrc) {
    const display = document.getElementById("displayPanel");
    display.style.backgroundImage = `url('${imageSrc}')`;
    display.innerHTML = ""; // clear text when image loads
  }




async function loadDotaProfile() {
  const steam32 = "913869424"; // Steam32 IDs
  const output = document.getElementById("dota-output");

  output.innerHTML = `<p><span class="text-[#888888]">[INFO]</span> Loading Dota 2 data...</p>`;

  try {

    const resProfile = await fetch(
      `https://api.opendota.com/api/players/${steam32}`
    );
    const dataProfile = await resProfile.json();

    const { personaname, avatar, profileurl } = dataProfile.profile;
    const mmr = dataProfile.mmr_estimate?.estimate ?? "N/A";
// Comment

    const resHeroList = await fetch(
      "https://api.opendota.com/api/heroes"
    );
    const heroList = await resHeroList.json();

    // Heroes to display
    const selectedHeroes = [
      "Anti-Mage",
      "Slark",
      "Phantom Lancer"
    ];

    const filteredHeroes = heroList.filter(hero =>
      selectedHeroes.includes(hero.localized_name)
    );

    let heroesHTML = `<p><span class="text-[#888888]">[INFO]</span> Heroes Info:</p>`;

    if (filteredHeroes.length === 0) {
      heroesHTML += `<div class="ml-4">No heroes found.</div>`;
    } else {
      filteredHeroes.forEach(hero => {
        heroesHTML += `
          <div class="ml-4">
            > Hero: ${hero.localized_name}<br/>
            &nbsp;&nbsp;• Primary Attribute: ${hero.primary_attr.toUpperCase()}<br/>
            &nbsp;&nbsp;• Attack Type: ${hero.attack_type}<br/>
            &nbsp;&nbsp;• Roles: ${hero.roles.join(", ")}
          </div>
        `;
      });
    }

output.innerHTML = `
  <div class="max-w-4xl mx-auto p-4 text-sm md:text-base">

    <p class="mb-2">
      <span class="text-[#888888]">[OK]</span> Player Loaded
    </p>

    <!-- Profile Section -->
    <div class="flex flex-col md:flex-row gap-4 items-start md:items-center border border-[#00FF00] p-4 rounded">

      <img
        src="${avatar}"
        alt="Avatar"
        class="w-20 h-20 md:w-24 md:h-24 border border-[#00FF00] rounded"
      />

      <div class="space-y-1">
        <p><span class="text-[#888888]">&gt;</span> Name: ${personaname}</p>
        <p><span class="text-[#888888]">&gt;</span> Steam ID: ${steam32}</p>
        <p><span class="text-[#888888]">&gt;</span> MMR Estimate: ${mmr}</p>
        <p class="break-all">
          <span class="text-[#888888]">&gt;</span> Profile:
          <a
            href="${profileurl}"
            target="_blank"
            class="text-[#00FF00] underline"
          >
            ${profileurl}
          </a>
        </p>
      </div>

    </div>

    <!-- Heroes Section -->
    <div class="mt-6">
      <p class="mb-2">
        <span class="text-[#888888]">[INFO]</span> Heroes Info
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${
          filteredHeroes.length === 0
            ? `<p class="text-gray-400">No heroes found.</p>`
            : filteredHeroes.map(hero => `
              <div class="border border-[#00FF00] p-3 rounded text-xs md:text-sm">
                <p class="font-bold mb-1">${hero.localized_name}</p>
                <p>• Primary: ${hero.primary_attr.toUpperCase()}</p>
                <p>• Attack: ${hero.attack_type}</p>
                <p class="break-words">• Roles: ${hero.roles.join(", ")}</p>
              </div>
            `).join("")
        }
      </div>
    </div>

    <p class="mt-6">
      <span class="text-[#888888]">[STATUS]</span> Ready
    </p>

  </div>
`;

  } catch (error) {
    console.error(error);
    output.innerHTML = `
      <p><span class="text-red-500">[ERROR]</span> Failed to load data.</p>
    `;
  }
}






