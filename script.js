// Playlists for each mood (working, public)
const moodToSpotify = {
    happy: ["37i9dQZF1DXdPec7aLTmlC", "37i9dQZF1DX3rxVfibe1L0"],        // Upbeat hits
    sad: ["37i9dQZF1DX7qK8ma5wgG1", "37i9dQZF1DWZqUHC2Kq6cT"],           // Emotional/slow songs
    relaxed: ["37i9dQZF1DWU0ScTcjJBdj"],                                 // Chill/lo-fi
    angry: ["37i9dQZF1DWZqUHC2Kq6cT"],                                    // Aggressive/rock/electronic
    excited: ["37i9dQZF1DX4dyzvuaRJ0n"],                                  // Party/energetic
    tired: ["37i9dQZF1DX3YSRoSdA634"],                                     // Calm/relaxing
    focused: ["37i9dQZF1DX8NTLI2TtZa6"],                                   // Study/work
    bored: ["37i9dQZF1DX3rxVfibe1L0"]                                      // Mixed hits
};

// Background colors for each mood
const moodColors = {
    happy: "#FFD700",
    sad: "#1E90FF",
    relaxed: "#7FFFD4",
    angry: "#FF4500",
    excited: "#FF69B4",
    tired: "#8A2BE2",
    focused: "#32CD32",
    bored: "#FF8C00"
};

const moods = Object.keys(moodToSpotify);

// Play mood from input
function playMood() {
    const mood = document.getElementById("moodInput").value.toLowerCase().trim();
    showMood(mood);
}

// Play random mood
function playRandomMood() {
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    showMood(randomMood);
}

// Display playlist and animations
function showMood(mood) {
    const playlists = moodToSpotify[mood];
    if (!playlists) {
        document.getElementById("suggestions").innerHTML =
            "Mood not recognized. Try: happy, sad, relaxed, angry, excited, tired, focused, bored.";
        document.getElementById("player").innerHTML = "";
        document.body.style.background = "#000000";
        return;
    }

    // Randomly pick one playlist if multiple
    const playlistId = playlists[Math.floor(Math.random() * playlists.length)];
    const color = moodColors[mood] || "#000000";

    // Set background color
    document.body.style.background = color;

    // Update suggestions text
    document.getElementById("suggestions").innerHTML = `Mood: <b>${mood}</b> → Enjoy your playlist`;

    // Display Spotify embed
    const playerDiv = document.getElementById("player");
    playerDiv.innerHTML = `
        <iframe src="https://open.spotify.com/embed/playlist/${playlistId}"
                width="100%" height="380" frameborder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowtransparency="true"></iframe>`;
    playerDiv.style.opacity = 0;
    setTimeout(() => { playerDiv.style.opacity = 1; }, 100);

    // Start animated circles
    startAnimation(color);
}

// Canvas animation
const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");
let circles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function startAnimation(color) {
    circles = [];
    for (let i = 0; i < 50; i++) {
        circles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 20 + 5,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            color: color
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();
        c.x += c.dx;
        c.y += c.dy;

        if (c.x < 0 || c.x > canvas.width) c.dx *= -1;
        if (c.y < 0 || c.y > canvas.height) c.dy *= -1;
    });
    requestAnimationFrame(animate);
}
animate();
