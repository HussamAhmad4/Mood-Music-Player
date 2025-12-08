const playlists = {
  happy: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC",
  chill: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6",
  sad: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1",
  mad: "https://open.spotify.com/embed/playlist/37i9dQZF1DX9qNs32fujYe",
  hype: "https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP",
  sleep: "https://open.spotify.com/embed/playlist/37i9dQZF1DWZd79rJ6a7lp",
  focus: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3PFzdbtx1Us"
};

const moods = Object.keys(playlists);

function generatePlaylist() {
  const mood = document.getElementById("moodSelect").value;
  setPlaylist(mood);
}

function randomMood() {
  const random = moods[Math.floor(Math.random() * moods.length)];
  document.getElementById("moodSelect").value = random;
  setPlaylist(random);
}

function setPlaylist(mood) {
  document.getElementById("spotifyPlayer").src = playlists[mood];
}

