// MoodSync - Dynamic Mood Music Player
// Main JavaScript File

// State Management
let currentState = {
    selectedMood: null,
    currentPlaylist: null,
    isLoggedIn: false,
    userData: null,
    playlistHistory: [],
    isRegisterMode: false
};

// Updated Spotify playlists with multiple options for each mood
const moodPlaylists = {
    happy: [
        "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC",
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0",
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX9XIFQuFvzM4"
    ],
    chill: [
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6",
        "https://open.spotify.com/embed/playlist/37i9dQZF1DWVA1Gq4XHa6U",
        "https://open.spotify.com/embed/playlist/37i9dQZF1DWTyjRnMgESue"
    ],
    sad: [
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1",
        "https://open.spotify.com/embed/playlist/37i9dQZF1DWZqd5JICZI0u",
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX3YSRoSdA634"
    ],
    mad: [
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX9qNs32fujYe",
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX6aTaZa0K6VA",
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX6tTW0xDxScH"
    ],
    hype: [
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP",
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd",
        "https://open.spotify.com/embed/playlist/37i9dQZF1DWY7IeIP1cdjF"
    ],
    sleep: [
        "https://open.spotify.com/embed/playlist/37i9dQZF1DWZd79rJ6a7lp",
        "https://open.spotify.com/embed/playlist/37i9dQZF1DWYcDQ1hSjOpY",
        "https://open.spotify.com/embed/playlist/37i9dQZF1DWTl4y3vgJOXW"
    ],
    focus: [
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX3PFzdbtx1Us",
        "https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ",
        "https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn"
    ]
};

// Mock backend simulation for academic purposes
class MockBackend {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('moodsync_users')) || [];
        this.playlists = JSON.parse(localStorage.getItem('moodsync_playlists')) || [];
        this.session = JSON.parse(localStorage.getItem('moodsync_session')) || null;
    }

    // Simulate API calls with delay
    async simulateRequest(data, delay = 800) {
        return new Promise(resolve => {
            setTimeout(() => resolve(data), delay);
        });
    }

    async register(userData) {
        const existingUser = this.users.find(u => u.email === userData.email || u.username === userData.username);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString(),
            preferences: {
                favoriteMoods: [],
                theme: 'dark'
            }
        };

        this.users.push(newUser);
        localStorage.setItem('moodsync_users', JSON.stringify(this.users));
        
        // Auto login after registration
        const session = {
            userId: newUser.id,
            username: newUser.username,
            token: 'mock-jwt-token-' + Date.now()
        };
        
        this.session = session;
        localStorage.setItem('moodsync_session', JSON.stringify(session));
        
        return this.simulateRequest({ success: true, user: newUser, session });
    }

    async login(credentials) {
        const user = this.users.find(u => 
            (u.username === credentials.username || u.email === credentials.username) && 
            u.password === credentials.password
        );

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const session = {
            userId: user.id,
            username: user.username,
            token: 'mock-jwt-token-' + Date.now()
        };

        this.session = session;
        localStorage.setItem('moodsync_session', JSON.stringify(session));
        
        return this.simulateRequest({ success: true, user, session });
    }

    async savePlaylist(playlistData) {
        if (!this.session) {
            throw new Error('Not authenticated');
        }

        const playlist = {
            id: Date.now(),
            userId: this.session.userId,
            ...playlistData,
            createdAt: new Date().toISOString(),
            likes: 0,
