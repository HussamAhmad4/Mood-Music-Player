const moodToSpotify = {
    happy: "37i9dQZF1DX3rxVfibe1L0",
    sad: "37i9dQZF1DWVrtsSlLKzro",
    relaxed: "37i9dQZF1DX4sWSpwq3LiO",
    angry: "37i9dQZF1DWYBO1MoTDhZI",
    excited: "37i9dQZF1DX5trt9i14X7j",
    tired: "37i9dQZF1DX4sWSpwq3LiO",
    focused: "37i9dQZF1DX8NTLI2TtZa6",
    bored: "37i9dQZF1DX3rxVfibe1L0"
};

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

function playMood() {
    const mood = document.getElementById("moodInput").value.toLowerCase().trim();
    showMood(mood);
}

function playRandomMood() {
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    showMood(randomMood);
}

function showMood(mood) {
    const playlistId = moodToSpotify[mood];
    const color = moodColors[mood] || "#000000";

    if (!playlistId) {
        document.getElementById("suggestions").innerHTML =
            "Mood not recognized. Try: happy, sad, relaxed, angry, excited, tired, focused, bored.";
        document.getElementById("player").innerHTML = "";
        document.body.style.background = "#000000";
        return;
    }

    document.body.style.background = color;
    document.getElementById("suggestions").innerHTML = `Mood: <b>${mood}</b> → Enjoy your playlist`;

    const playerDiv = document.getElementById("player");
    // Make the iframe appear and allow autoplay
    playerDiv.innerHTML = `
        <iframe src="https://open.spotify.com/embed/playlist/${playlistId}"
                width="100%" height="380" frameborder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowtransparency="true"></iframe>`;
    playerDiv.style.opacity = 0;
    setTimeout(() => { playerDiv.style.opacity = 1; }, 100);

    startAnimation(color);
}

// Animated circles in the background
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
