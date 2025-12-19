/***********************
 * FIREBASE SETUP
 ***********************/

// 🔴 PASTE YOUR OWN FIREBASE CONFIG HERE
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase (prevent double init on refresh)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Database reference
const database = firebase.database();
const gameRef = database.ref("game");

/***********************
 * GAME STATE
 ***********************/
const maxHearts = 3;
let purpleHearts = maxHearts;
let blueHearts = maxHearts;

/***********************
 * INITIALIZE GAME (ONLY IF EMPTY)
 ***********************/
gameRef.once("value").then((snapshot) => {
    if (!snapshot.exists()) {
        gameRef.set({
            purpleHearts: maxHearts,
            blueHearts: maxHearts
        });
    }
});

/***********************
 * REAL-TIME LISTENER
 ***********************/
gameRef.on("value", (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    purpleHearts = data.purpleHearts;
    blueHearts = data.blueHearts;

    drawHearts();

    const resetBtn = document.getElementById("resetBtn");
    if (purpleHearts === 0 || blueHearts === 0) {
        resetBtn.style.display = "block";
    } else {
        resetBtn.style.display = "none";
    }
});

/***********************
 * UI FUNCTIONS
 ***********************/
function drawHearts() {
    document.getElementById("purple-hearts").innerHTML =
        "❤️".repeat(purpleHearts);

    document.getElementById("blue-hearts").innerHTML =
        "❤️".repeat(blueHearts);
}

/***********************
 * GAME ACTIONS
 ***********************/
function loseHeart(player) {
    gameRef.transaction((game) => {
        if (!game) return game;

        if (player === "purple" && game.purpleHearts > 0) {
            game.purpleHearts--;
        }

        if (player === "blue" && game.blueHearts > 0) {
            game.blueHearts--;
        }

        return game;
    });
}

function resetGame() {
    gameRef.set({
        purpleHearts: maxHearts,
        blueHearts: maxHearts
    });
}
