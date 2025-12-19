const bgImages = [
  "https://via.placeholder.com/400x600?text=BG1",
  "https://via.placeholder.com/400x600?text=BG2",
  "https://via.placeholder.com/400x600?text=BG3",
  "https://via.placeholder.com/400x600?text=BG4"
];



const navButtons = document.querySelectorAll(".nav-link");
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.target);
    target.scrollIntoView({ behavior: "smooth" });
  });
});

function typeHTML(element, speed = 50) {
  const html = element.innerHTML;  
  element.innerHTML = "";           
  let i = 0;
  let buffer = "";
  let inTag = false;

  function type() {
    if (i < html.length) {
      const char = html[i];

      if (char === "<") inTag = true;  

      if (inTag) {
        buffer += char;                
        if (char === ">") {            
          element.innerHTML += buffer; 
          buffer = "";
          inTag = false;
        }
      } else {
        element.innerHTML += char;  
      }

      i++;
      setTimeout(type, speed);
    }
  }

  type();
}


document.addEventListener("DOMContentLoaded", () => {
  const animatedIntro = document.getElementById("animated-intro");
  typeHTML(animatedIntro, 50); 
});

function createSparkle() {
  const sparkle = document.createElement("div");
  const size = Math.random() * 8 + 3;
  sparkle.style.width = sparkle.style.height = size + "px";
  sparkle.style.background = "white";
  sparkle.style.borderRadius = "50%";
  sparkle.style.position = "fixed";
  sparkle.style.left = Math.random() * window.innerWidth + "px";
  sparkle.style.top = Math.random() * window.innerHeight + "px";
  sparkle.style.opacity = 0.8 + Math.random() * 0.2;
  sparkle.style.pointerEvents = "none";
  sparkle.style.zIndex = 0;
  sparkle.style.transition = "transform 1.5s ease-out, opacity 1.5s ease-out";
  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.style.transform = `translateY(-150px) scale(0)`;
    sparkle.style.opacity = 0;
  }, 50);

  setTimeout(() => sparkle.remove(), 1500);
}

setInterval(() => {
  for (let i = 0; i < 3; i++) createSparkle();
}, 300);




const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const isActive = card.classList.contains('active');

 
    cards.forEach(c => {
      c.classList.remove('active','dimmed');
    });

    if (!isActive) {
    
      card.classList.add('active');
      cards.forEach(c => {
        if (c !== card) c.classList.add('dimmed');
      });
    }
  });
});



  const bookElement = document.getElementById("bookElement");

  async function loadBookAPI() {
    try {
      const res = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=10"
      );
      const data = await res.json();

      const books = data.items;
      const randomBook = books[Math.floor(Math.random() * books.length)];
      const info = randomBook.volumeInfo;

      const title = info.title || "Unknown Title";
      const authors = info.authors ? info.authors.join(", ") : "Unknown Author";
      const description = info.description
        ? info.description.slice(0, 180) + "…"
        : "No description available.";

      const thumbnail =
        info.imageLinks?.thumbnail ||
        "https://via.placeholder.com/128x192?text=No+Cover";

      bookElement.innerHTML = `
        <div class="flex gap-4">
          <img src="${thumbnail}"
               alt="${title}"
               class="w-24 h-36 object-cover rounded-lg shadow-md border border-white/10"/>

          <div class="flex flex-col justify-between">
            <div>
              <p class="text-xs text-green-400 mb-1">📚 Book Pick</p>
              <h3 class="font-bold text-lg leading-tight">${title}</h3>
              <p class="text-sm text-gray-400 mb-2">by ${authors}</p>
              <p class="text-sm text-gray-300 leading-snug">
                ${description}
              </p>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      bookElement.innerHTML =
        "<p class='text-red-400 text-sm'>Could not load book info 😢</p>";
      console.error("Error fetching book:", error);
    }
  }

  loadBookAPI();




  const jokeElement = document.getElementById("js-joke-api");

  async function loadProgrammingJoke() {
    try {
      const res = await fetch(
        "https://thequoteshub.com/api/random-quote"
      );
      const data = await res.json();
         jokeElement.textContent = data.text + " — " + data.author;
    } catch (error) {
      jokeElement.textContent =
        "Could not load a programming joke";
      console.error("Joke API error:", error);
    }
  }

  loadProgrammingJoke();

