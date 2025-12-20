const firebaseConfig = {
  apiKey: "AIzaSyB0OVE-fDEz03BJJNKKu26QbzUiqC8_eFo",
  authDomain: "heart-scoreboard-417a8.firebaseapp.com",
  databaseURL: "https://heart-scoreboard-417a8-default-rtdb.firebaseio.com",
  projectId: "heart-scoreboard-417a8",
  storageBucket: "heart-scoreboard-417a8.firebasestorage.app",
  messagingSenderId: "627631300388",
  appId: "1:627631300388:web:60622c10c3bac3e0e39db1"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const playersRef = database.ref("players");

function updateHearts(id, lives) {
  const el = document.getElementById(id);
  el.innerHTML = "❤️".repeat(lives);
}

playersRef.once("value", snap => {
  if (!snap.exists()) {
    playersRef.set({
      player1: 3,
      player2: 3
    });
  }
});

playersRef.on("value", snap => {
  const data = snap.val();
  if (!data) return;

  updateHearts("p1-hearts", data.player1);
  updateHearts("p2-hearts", data.player2);

  document.getElementById("resetBtn").style.display =
    (data.player1 === 0 || data.player2 === 0) ? "block" : "none";
});

function loseLife(player) {
  const ref = database.ref("players/" + player);
  ref.transaction(v => (v > 0 ? v - 1 : v));
}

function resetGame() {
  playersRef.set({
    player1: 3,
    player2: 3
  });
}
