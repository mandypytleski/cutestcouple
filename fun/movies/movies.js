const supabaseUrl = "https://mboddoezgkpmzqnwypcs.supabase.co";
const supabaseKey = "sb_publishable_4RRfiDAs6WR5ei269O6sbg_FqHGIt95";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const TMDB_API_KEY = "e503856a1a00ebe8bf6218ff187a5706";

let allMovies = [];

async function loadWatchedMovies() {
  const { data, error } = await supabaseClient
    .from("movies")
    .select("*")
    .order("watched_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }


  allMovies = data;
    applyFilters(); // instead of displayWatched(allMovies)
}

function applyFilters() {
  const query = document
    .getElementById("watchInput")
    .value
    .toLowerCase()
    .trim();

  const sort = document.getElementById("sortSelect").value;

  let filtered = [...allMovies];

  // 🔍 SEARCH
  if (query) {
    filtered = filtered.filter(movie =>
      movie.title.toLowerCase().includes(query) ||
      (movie.review && movie.review.toLowerCase().includes(query))
    );
  }

  // 🔽 SORT
  switch (sort) {
    case "newest":
      filtered.sort((a, b) => new Date(b.watched_at) - new Date(a.watched_at));
      break;

    case "oldest":
      filtered.sort((a, b) => new Date(a.watched_at) - new Date(b.watched_at));
      break;

    case "rating-high":
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;

    case "rating-low":
      filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      break;

    case "az":
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "za":
      filtered.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  displayWatched(filtered);
}

function displayWatched(movies) {
  const container = document.getElementById("watched-list");
  container.innerHTML = "";

  movies.forEach(movie => {
    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "https://placehold.co/200x300";

    const stars = "★".repeat(movie.rating || 0) + "☆".repeat(5 - (movie.rating || 0));

    const date = movie.watched_at
      ? new Date(movie.watched_at).toLocaleDateString()
      : "Unknown";

    container.innerHTML += `
      <div class="col-md-3">
        <div class="movie2-card h-100 shadow-sm" data-id="${movie.id}" data-tmdb="${movie.tmdb_id}">
          <img src="${poster}" class="card-img-top">

          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>

            <p class="mb-1 text-warning">${stars}</p>

            <p class="text-muted mb-2" style="font-size: 0.9rem;">
              Watched on ${date}
            </p>

            <p class="card-text">
              ${movie.review || "No review yet."}
            </p>
          </div>
        </div>
      </div>
    `;
  });
  attachMovieCardListeners();
}

async function openMovieModal(id, tmdbId) {
  const movie = allMovies.find(m => String(m.id) === String(id));

  if (!movie) return;

  // Fill basic info
  document.getElementById("modalTitle").innerText = movie.title;

  document.getElementById("modalPoster").src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/300x450";

  document.getElementById("modalRating").innerText =
    `Rating: ${movie.rating || "N/A"} / 5`;

  document.getElementById("modalDate").innerText =
    movie.watched_at
      ? `Watched on ${new Date(movie.watched_at).toLocaleDateString()}`
      : "";

  // If no TMDB ID, skip API
  if (!tmdbId) {
    document.getElementById("modalOverview").innerText =
      movie.review || "No overview available.";
    return;
  }

  // Fetch TMDB details
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}`
  );

  const data = await res.json();

  document.getElementById("modalOverview").innerText =
    data.overview || movie.review || "No overview available.";

  // Fetch similar movies
  loadSimilarMovies(tmdbId);
  const modal = new bootstrap.Modal(document.getElementById("movieModal"));
    modal.show();
    console.log("movie id:", id);
console.log("tmdb id:", tmdbId);
}

async function loadSimilarMovies(tmdbId) {
  const container = document.getElementById("similarMovies");
  container.innerHTML = "";

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdbId}/similar?api_key=${TMDB_API_KEY}`
  );

  const data = await res.json();

  data.results.slice(0, 6).forEach(movie => {
    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : "https://placehold.co/100x150";

    container.innerHTML += `
      <div class="col-4 col-md-2 text-center">
        <img src="${poster}" class="img-fluid rounded mb-1">
        <small>${movie.title}</small>
      </div>
    `;
  });
}

function attachMovieCardListeners() {
  const cards = document.querySelectorAll(".movie2-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id");
      const tmdbId = card.getAttribute("data-tmdb");

      openMovieModal(id, tmdbId);
    });
  });
}

window.onload = loadWatchedMovies;