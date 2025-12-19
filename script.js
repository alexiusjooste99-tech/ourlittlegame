let purpleHearts = 3;
let blueHearts = 3;

const maxHearts = 3;

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

    drawHearts();

    if (purpleHearts === 0 || blueHearts === 0) {
        document.getElementById("resetBtn").style.display = "inline-block";
    }
}

function resetGame() {
    purpleHearts = maxHearts;
    blueHearts = maxHearts;
    document.getElementById("resetBtn").style.display = "none";
    drawHearts();
}

// Draw hearts when page loads
drawHearts();
