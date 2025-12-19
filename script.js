const maxHearts = 3;

// Load saved hearts or default to 3
let purpleHearts = localStorage.getItem("purpleHearts")
    ? Number(localStorage.getItem("purpleHearts"))
    : maxHearts;

let blueHearts = localStorage.getItem("blueHearts")
    ? Number(localStorage.getItem("blueHearts"))
    : maxHearts;

function saveGame() {
    localStorage.setItem("purpleHearts", purpleHearts);
    localStorage.setItem("blueHearts", blueHearts);
}

function drawHearts() {
    document.getElementById("purple-hearts").innerHTML =
        "❤️".repeat(purpleHearts);

    document.getElementById("blue-hearts").innerHTML =
        "❤️".repeat(blueHearts);
}

function loseHeart(player) {
    if (player === "purple" && purpleHearts > 0) {
        purpleHearts--;
    }

    if (player === "blue" && blueHearts > 0) {
        blueHearts--;
    }

    saveGame();
    drawHearts();

    if (purpleHearts === 0 || blueHearts === 0) {
        document.getElementById("resetBtn").style.display = "inline-block";
    }
}

function resetGame() {
    purpleHearts = maxHearts;
    blueHearts = maxHearts;

    saveGame();
    drawHearts();

    document.getElementById("resetBtn").style.display = "none";
}

// Show reset button if someone already lost
if (purpleHearts === 0 || blueHearts === 0) {
    document.getElementById("resetBtn").style.display = "inline-block";
}

// Draw hearts when page loads
drawHearts();

