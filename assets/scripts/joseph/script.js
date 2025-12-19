const bgImages = [
    "../../assets/image/joseph/mugshot/mugShot-front.png",
    "../../assets/image/joseph/mugshot/mugShot-left.png",
    "../../assets/image/joseph/mugshot/mugShot-back.png",
    "../../assets/image/joseph/mugshot/mugShot-right.png",
];

const quotes = [
    "If the king doesn’t lead, the people will never follow.",
    "The world is not perfect. But it can be changed.",
    "The world can only change through those willing to challenge it.",
    "If strength is justice, then is powerlessness a crime?",
    "I will create a peaceful world, but only if I become a villain in the eyes of history.",
];


const carousel = document.getElementById("image-carousel");
const continueButton = document.getElementById("js-continue-button");
const containers = document.querySelectorAll(".js-tab");
const navButtons = document.querySelectorAll("nav ul li");


const favoriteContainer = document.getElementById('favorite-shows-container');
const currentlyWatchingContainer = document.getElementById('currently-watching-container');


continueButton.addEventListener("click", () => {
    document.getElementById("js-connection-container").classList.add("hidden");
    document.getElementById("js-home-container").classList.remove("hidden");

    setTimeout(() => {
        document.getElementById("js-home-container").classList.add("opacity-100");
    }, 50);
});


navButtons.forEach((item, index) => {
    item.addEventListener("click", () => {
        const targetContainer = containers[index];
        
        if (!targetContainer) {
            console.error(`No content container found for navigation index ${index}`);
            return;
        }

        containers.forEach(container => {
            container.classList.remove("flex");
            container.classList.add("hidden");
        });

        targetContainer.classList.remove("hidden");
        targetContainer.classList.add("flex");
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

const text = "VOCTORIA ULTIMA";
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
    y = (y + 1) % quotes.length; 
    document.getElementById("js-quotes").textContent = quotes[y];
}, 4000);

function openCert(img) {
    document.getElementById("certImage").src = img;
    document.getElementById("imageContainer").classList.remove("hidden");
    document.getElementById("imageContainer").classList.add("flex");
    document.getElementById("typewriter").classList.add("hidden");
    document.getElementById("certVideo").play();
}

function closeCert() {
    document.getElementById("imageContainer").classList.add("hidden");
    document.getElementById("imageContainer").classList.remove("flex");
    document.getElementById("typewriter").classList.remove("hidden");
    document.getElementById("certVideo").pause();
    document.getElementById("certVideo").currentTime = 0;
}

const TMDB_API_KEY = 'dc32ea99d1a41863b0717ad07b3bf7be';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchMediaDetails(type, id) {
    const url = `${TMDB_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching ID ${id}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

const myFavoriteShows = [
    { type: 'tv', id: 121964 },   
    { type: 'tv', id: 31724},    
];

const currentlyWatching = [
    { type: 'tv', id: 65930 },      
    { type: 'tv', id: 37854 },      
];

function createMediaCard(media, type) {
    const title = media.title || media.name;
    const releaseDate = media.release_date || media.first_air_date;
    const overview = media.overview || "No synopsis available.";
    
    let creator = 'N/A';
    if (type === 'movie' && media.credits && media.credits.crew) {
        const director = media.credits.crew.find(person => person.job === 'Director');
        creator = director ? director.name : 'N/A';
    } else if (type === 'tv' && media.created_by && media.created_by.length > 0) {
        creator = media.created_by[0].name;
    }

    const posterPath = media.poster_path 
        ? `${IMAGE_BASE_URL}${media.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=No+Poster';
    
    const card = document.createElement('div');
    card.className = 'bg-[#181715] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col h-full'; 

    card.innerHTML = `
        <img 
            src="${posterPath}" 
            alt="${title} Poster" 
            class="w-full h-auto object-cover aspect-[2/3]"
        >
        <div class="p-3 text-left flex-1 flex flex-col">
            <h4 class="text-white text-md font-bold mb-1" title="${title}">${title}</h4>
            <p class="text-[#B5B8A6] text-xs mb-2 italic line-clamp-4">
                ${overview}
            </p>
            <div class="mt-auto pt-2 border-t border-gray-700">
                <p class="text-cyan-400 text-xs">
                    ${type === 'tv' ? 'TV Show' : 'Movie'} | ${releaseDate ? releaseDate.substring(0, 4) : 'N/A'}
                </p>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        window.open(`https://www.themoviedb.org/${type}/${media.id}`, '_blank');
    });

    return card;
}

async function loadMediaList(mediaList, containerElement) {
    if (!containerElement) return;

    containerElement.innerHTML = ''; 

    const limitedList = mediaList.slice(0, 2); 

    const promises = limitedList.map(item => {
        const url = `${TMDB_BASE_URL}/${item.type}/${item.id}?api_key=${TMDB_API_KEY}&append_to_response=credits`;
        return fetch(url).then(response => response.ok ? response.json() : null);
    });
    
    const results = await Promise.all(promises);

    let mediaLoadedCount = 0;

    results.forEach((media, index) => {
        const currentItem = limitedList[index]; 
        
        if (media) {
            const card = createMediaCard(media, currentItem.type);
            containerElement.appendChild(card);
            mediaLoadedCount++;
        }
    });

    if (mediaLoadedCount === 0) {
        containerElement.innerHTML = '<p class="text-yellow-500 text-center col-span-2 p-4">No data available or failed to load media.</p>';
    }
}



window.onload = () => {
    typeWriter(); 

    loadMediaList(myFavoriteShows, favoriteContainer);
    loadMediaList(currentlyWatching, currentlyWatchingContainer);
};