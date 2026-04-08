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
  loadWatchlist();
};

async function searchTMDB() {
  const query = document.getElementById("watchInput").value;

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
      openReviewModal(item);
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

    <div class="d-flex gap-2">
      <button class="btn btn-success" id="watchedBtn">
        Mark as Watched
      </button>

      <button class="btn btn-danger" id="removeBtn">
        Remove
      </button>

      <button class="btn btn-light" data-bs-dismiss="modal">
        Close
      </button>
    </div>
  `;

  document.getElementById("watchedBtn").onclick = () => {
    openReviewModal(item);
  };

  document.getElementById("removeBtn").onclick = async () => {
    await removeFromWatchlist(item.id);
    bootstrap.Modal.getInstance(document.getElementById("movieModal")).hide();
  };

  const modal = new bootstrap.Modal(document.getElementById("movieModal"));
  modal.show();
}

function openModal(item) {
  currentItem = item;

  const title = item.title || item.name;
  const overview = item.overview || "No description available.";
  const rating = item.vote_average || "N/A";
  const date = item.release_date || item.first_air_date || "Unknown";

  const backdrop = item.backdrop_path
    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
    : "";

  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalContent = document.getElementById("modalContent");

  modalBackdrop.style.backgroundImage = `url(${backdrop})`;

  modalContent.innerHTML = `
    <h2 class="modal-title mb-2">${title}</h2>
    <p class="mb-2"><strong>⭐ ${rating}</strong> • ${date}</p>
    <p class="mb-4">${overview}</p>

    <button class="btn btn-success me-2" id="addToWatchlistBtn">
      + Add to Watchlist
    </button>

    <button class="btn btn-light" data-bs-dismiss="modal">
      Close
    </button>
  `;

  // ✅ Attach listener AFTER the button exists
  document.getElementById("addToWatchlistBtn").onclick = () => {
    if (currentItem) {
      addToWatchlist(currentItem);
    }
  };

  const modal = new bootstrap.Modal(document.getElementById("movieModal"));
  modal.show();
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

function openReviewModal(item) {
  selectedItem = item;

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
        tmdb_id: selectedItem.id,
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