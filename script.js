// 🔥 Firebase config (PASTE YOUR OWN HERE)
const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "XXXX",
    appId: "XXXX"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Reference to game state
const gameRef = database.ref("game");

// Default hearts
const maxHearts = 3;

// Listen for changes (REAL-TIME SYNC)
gameRef.on("value", (snapshot) => {
    const data = snapshot.val();

    if (!data) return;

    purpleHearts = data.purpleHearts;
    blueHearts = data.blueHearts;

    drawHearts();

    if (purpleHearts === 0 || blueHearts === 0) {
        document.getElementById("resetBtn").style.display = "block";
    }
});

// Draw hearts
function drawHearts() {
    document.getElementById("purple-hearts").innerHTML =
        "❤️".repeat(purpleHearts);

    document.getElementById("blue-hearts").innerHTML =
        "❤️".repeat(blueHearts);
}

// Lose heart
function loseHeart(player) {
    gameRef.transaction((game) => {
        if (!game) {
            return { purpleHearts: maxHearts, blueHearts: maxHearts };
        }

        if (player === "purple" && game.purpleHearts > 0) {
            game.purpleHearts--;
        }

        if (player === "blue" && game.blueHearts > 0) {
            game.blueHearts--;
        }

        return game;
    });
}

// Reset game
function resetGame() {
    gameRef.set({
        purpleHearts: maxHearts,
        blueHearts: maxHearts
    });

    document.getElementById("resetBtn").style.display = "none";
}
