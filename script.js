const playlists = {
  happy: [
    "Happy - Pharrell Williams",
    "Good As Hell - Lizzo",
    "Can't Stop The Feeling - Justin Timberlake"
  ],

  chill: [
    "Sunset Lover - Petit Biscuit",
    "Location - Khalid",
    "Pink + White - Frank Ocean"
  ],

  sad: [
    "Someone Like You - Adele",
    "Fix You - Coldplay",
    "All I Want - Kodaline"
  ],

  mad: [
    "Lose Yourself - Eminem",
    "Break Stuff - Limp Bizkit",
    "Smells Like Teen Spirit - Nirvana"
  ],

  hype: [
    "POWER - Kanye West",
    "Turn Down For What - DJ Snake",
    "Can't Hold Us - Macklemore"
  ],

  sleep: [
    "Weightless - Marconi Union",
    "Night Owl - Galimatias",
    "River - Leon Bridges"
  ],

  focus: [
    "Lo-fi Beats Mix",
    "Study Music 2024",
    "Chillhop Essentials"
  ]
};

function generatePlaylist() {
  const mood = document.getElementById("moodSelect").value;
  const list = playlists[mood];

  const playlistUI = document.getElementById("playlist");
  playlistUI.innerHTML = "";

  list.forEach(song => {
    const li = document.createElement("li");
    li.textContent = song;
    playlistUI.appendChild(li);
  });
}

