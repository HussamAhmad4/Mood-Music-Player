// ----- DATABASE (localStorage) -----
let db = JSON.parse(localStorage.getItem("db")) || {
  users: {},
  publicPlaylists: []
};

let currentUser = null;
let currentPlaylist = [];

// ----- SONG DATA -----
const songs = {
  happy: ["Song A", "Song B", "Song C", "Song D", "Song E"],
  sad: ["Song F", "Song G", "Song H", "Song I", "Song J"],
  chill: ["Song K", "Song L", "Song M", "Song N", "Song O"],
  mad: ["Song P", "Song Q", "Song R", "Song S", "Song T"]
};

// ----- AUTH -----
function signup() {
  const u = username.value;
  const p = password.value;

  if (db.users[u]) {
    authStatus.textContent = "User already exists";
    return;
  }

  db.users[u] = { password: p, playlists: [] };
  saveDB();
  authStatus.textContent = "Account created. Please log in.";
}

function login() {
  const u = username.value;
  const p = password.value;

  if (!db.users[u] || db.users[u].password !== p) {
    authStatus.textContent = "Invalid login";
    return;
  }

  currentUser = u;
  document.getElementById("authSection").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("currentUser").textContent = u;
  loadPublicPlaylists();
}

// ----- PLAYLIST GENERATION -----
function generatePlaylist() {
  const mood = moodSelect.value;
  if (!mood) return;

  const shuffled = [...songs[mood]].sort(() => 0.5 - Math.random());
  currentPlaylist = shuffled.slice(0, 4);

  songsContainer.innerHTML = "";
  currentPlaylist.forEach(song => {
    const div = document.createElement("div");
    div.className = "song";
    div.textContent = song;
    songsContainer.appendChild(div);
  });
}

// ----- SAVE & SHARE -----
function savePlaylist() {
  if (!currentUser || currentPlaylist.length === 0) return;

  const playlist = {
    user: currentUser,
    songs: currentPlaylist
  };

  db.users[currentUser].playlists.push(playlist);
  db.publicPlaylists.push(playlist);
  saveDB();
  loadPublicPlaylists();
}

// ----- LOAD PUBLIC PLAYLISTS -----
function loadPublicPlaylists() {
  publicPlaylists.innerHTML = "";

  db.publicPlaylists.forEach(p => {
    const div = document.createElement("div");
    div.textContent = `${p.user}: ${p.songs.join(", ")}`;
    publicPlaylists.appendChild(div);
  });
}

// ----- UTIL -----
function saveDB() {
  localStorage.setItem("db", JSON.stringify(db));
}
