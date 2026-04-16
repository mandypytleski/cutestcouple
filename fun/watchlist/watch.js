const supabaseUrl = "https://mboddoezgkpmzqnwypcs.supabase.co";
const supabaseKey = "sb_publishable_4RRfiDAs6WR5ei269O6sbg_FqHGIt95";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const TMDB_API_KEY = "e503856a1a00ebe8bf6218ff187a5706";

let currentItem = null;

let watchedIds = new Set();
async function loadWatchedIds() {
  const { data, error } = await supabaseClient
    .from("movies")
    .select("tmdb_id");

  if (!error) {
    watchedIds = new Set(data.map(m => m.tmdb_id));
  }
}

window.onload = async () => {
  await loadWatchedIds();
  await searchTMDB();  // show popular on load
  loadWatchlist();
};

async function searchTMDB() {
  const query = document.getElementById("watchInput").value.trim();

  if (!query) {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API_KEY}`
    );
    const data = await res.json();
    displayResults(data.results);
    return;
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${query}`
  );
  const data = await res.json();
  displayResults(data.results);
}

async function addToWatchlist(item) {
  const { data, error } = await supabaseClient
    .from("watchlist")
    .insert([
      {
        tmdb_id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        media_type: item.media_type
      }
    ])
    .select();

  console.log("INSERT DATA:", data);
  console.log("INSERT ERROR:", error);

  if (error) {
    alert(error.message);
  } else {
    confetti();
    loadWatchlist();
  }
}

async function loadWatchlist() {
  const { data, error } = await supabaseClient
    .from("watchlist")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  displaySaved(data);
}

function displaySaved(items) {
  const container = document.getElementById("watchlist");
  container.innerHTML = "";

  items.forEach(item => {
    const poster = item.poster_path
      ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
      : "https://placehold.co/200x300";

    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.style.position = "relative";

    card.innerHTML = `
        <div class="delete-btn">×</div>

        <div class="watched-btn">✓</div>

        <img src="${poster}">
        <div class="card-overlay">${item.title}</div>
      `;
    


    // Delete handler
    card.querySelector(".delete-btn").onclick = (e) => {
      e.stopPropagation();
      removeFromWatchlist(item.id);
    };

    card.querySelector(".watched-btn").onclick = (e) => {
      e.stopPropagation();
      openReviewModal(item.tmdb_id, item);
    };

    card.onclick = () => openModalSaved(item);
    container.appendChild(card);
  });
}

function displayResults(results) {
  const container = document.getElementById("search-results");
  container.innerHTML = "";

  results
  .filter(item => item.media_type === "movie" || item.media_type === "tv")
  .forEach(item => {
    const poster = item.poster_path
      ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
      : "https://via.placeholder.com/200x300";

    const isWatched = watchedIds.has(item.id);

    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${poster}">
      <div class="card-overlay">
        ${isWatched ? "Already Watched" : "+ Add"}
      </div>
    `;

    card.onclick = () => openModal(item);

    container.appendChild(card);
  });
}

async function openModalSaved(item) {
  currentItem = item;

  const title = item.title;
  const details = await fetchMovieDetails(item.tmdb_id, item.media_type);

  const overview = details.overview;
  const rating = details.vote_average;
  const date = details.release_date || details.first_air_date;
  const poster = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : "https://placehold.co/300x450";

  const modalContent = document.getElementById("modalContent");
  const modalBackdrop = document.getElementById("modalBackdrop");

  modalBackdrop.style.backgroundImage = `url(${poster})`;

  modalContent.innerHTML = `
    <h2 class="modal-title mb-2">${title}</h2>
    <p class="mb-2"><strong>⭐ ${rating}</strong> • ${date}</p>
    <p class="mb-4">${overview}</p>
    <div class="mb-4">
      <p class="text-white-50 small mb-1">WHERE TO WATCH</p>
      <div id="providerSlot">Loading...</div>
    </div>
    <div class="d-flex gap-2">
      <button class="btn btn-success" id="watchedBtn">Mark as Watched</button>
      <button class="btn btn-danger" id="removeBtn">Remove</button>
      <button class="btn btn-light" data-bs-dismiss="modal">Close</button>
    </div>
  `;

  document.getElementById("watchedBtn").onclick = () => openReviewModal(item.tmdb_id, item);
  document.getElementById("removeBtn").onclick = async () => {
    await removeFromWatchlist(item.id);
    bootstrap.Modal.getInstance(document.getElementById("movieModal")).hide();
  };

  const modal = new bootstrap.Modal(document.getElementById("movieModal"));
  modal.show();

  // Fetch providers and inject
  const providers = await fetchWatchProviders(item.tmdb_id, item.media_type);
  document.getElementById("providerSlot").innerHTML = renderWatchProviders(providers);
}

async function openModal(item) {
  currentItem = item;

  const title = item.title || item.name;
  const overview = item.overview || "No description available.";
  const rating = item.vote_average || "N/A";
  const date = item.release_date || item.first_air_date || "Unknown";
  const mediaType = item.media_type;

  const backdrop = item.backdrop_path
    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
    : "";

  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalContent = document.getElementById("modalContent");

  modalBackdrop.style.backgroundImage = `url(${backdrop})`;

  // Show modal with loading state for providers
  modalContent.innerHTML = `
    <h2 class="modal-title mb-2">${title}</h2>
    <p class="mb-2"><strong>⭐ ${rating}</strong> • ${date}</p>
    <p class="mb-4">${overview}</p>
    <div class="mb-4">
      <p class="text-white-50 small mb-1">WHERE TO WATCH</p>
      <div id="providerSlot">Loading...</div>
    </div>
    <button class="btn btn-success me-2" id="addToWatchlistBtn">+ Add to Watchlist</button>
    <button class="btn btn-light" data-bs-dismiss="modal">Close</button>
  `;

  document.getElementById("addToWatchlistBtn").onclick = () => {
    if (currentItem) addToWatchlist(currentItem);
  };

  const modal = new bootstrap.Modal(document.getElementById("movieModal"));
  modal.show();

  // Fetch providers and inject
  const providers = await fetchWatchProviders(item.id, mediaType);
  document.getElementById("providerSlot").innerHTML = renderWatchProviders(providers);
}

async function removeFromWatchlist(id) {
  const { error } = await supabaseClient
    .from("watchlist")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
  } else {
    loadWatchlist();
  }
}

let selectedItem = null;

function openReviewModal(tmdbId, item) {
  selectedItem = item;
  selectedItem.tmdb_id = tmdbId; // 🔒 lock correct ID

  const modal = new bootstrap.Modal(document.getElementById("reviewModal"));
  modal.show();
}


document.getElementById("submitReviewBtn").onclick = async () => {
  const review = document.getElementById("reviewInput").value;
  const watchedAt = document.getElementById("watchedAt").value;

  if (!selectedItem) return;

  const { error: insertError } = await supabaseClient
    .from("movies")
    .insert([
      {
        tmdb_id: selectedItem.tmdb_id,
        title: selectedItem.title || selectedItem.name,
        poster_path: selectedItem.poster_path,
        media_type: selectedItem.media_type,
        rating: selectedRating,
        review: review,
        watched_at: watchedAt || new Date().toISOString()
      }
    ]);

  if (insertError) {
    alert(insertError.message);
    return;
  }

  await supabaseClient
  .from("watchlist")
  .delete()
  .eq("tmdb_id", selectedItem.tmdb_id || selectedItem.id);

  loadWatchlist();

  bootstrap.Modal.getInstance(document.getElementById("reviewModal")).hide();
  await loadWatchedIds();
};

let selectedRating = 0;

document.querySelectorAll(".star").forEach(star => {
  star.addEventListener("click", () => {
    selectedRating = parseInt(star.dataset.value);

    document.querySelectorAll(".star").forEach(s => {
      s.classList.remove("selected");
    });

    document.querySelectorAll(".star").forEach(s => {
      if (parseInt(s.dataset.value) <= selectedRating) {
        s.classList.add("selected");
      }
    });
  });
});

async function fetchMovieDetails(tmdbId, mediaType) {
  const res = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${tmdbId}?api_key=${TMDB_API_KEY}`
  );
  return await res.json();
}

async function fetchWatchProviders(tmdbId, mediaType) {
  const res = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${tmdbId}/watch/providers?api_key=${TMDB_API_KEY}`
  );
  const data = await res.json();
  // US results, flatrate = streaming, rent = rental, buy = purchase
  return data.results?.US || null;
}

function renderWatchProviders(providers) {
  if (!providers) return `<p class="text-white-50 small">No streaming info available.</p>`;

  const sections = [];

  if (providers.flatrate?.length) {
    const logos = providers.flatrate.map(p =>
      `<img src="https://image.tmdb.org/t/p/original${p.logo_path}" 
            title="${p.provider_name}"
            style="height:36px; border-radius:8px;" />`
    ).join("");
    sections.push(`<div class="mb-1"><small class="text-white-50">Stream</small><br>${logos}</div>`);
  }

  if (providers.rent?.length) {
    const logos = providers.rent.map(p =>
      `<img src="https://image.tmdb.org/t/p/original${p.logo_path}" 
            title="${p.provider_name}"
            style="height:36px; border-radius:8px;" />`
    ).join("");
    sections.push(`<div class="mb-1"><small class="text-white-50">Rent</small><br>${logos}</div>`);
  }

  if (providers.buy?.length) {
    const logos = providers.buy.map(p =>
      `<img src="https://image.tmdb.org/t/p/original${p.logo_path}" 
            title="${p.provider_name}"
            style="height:36px; border-radius:8px;" />`
    ).join("");
    sections.push(`<div class="mb-1"><small class="text-white-50">Buy</small><br>${logos}</div>`);
  }

  if (sections.length === 0) return `<p class="text-white-50 small">Not available for streaming.</p>`;

  return `<div class="d-flex flex-column gap-1">${sections.join("")}</div>`;
}