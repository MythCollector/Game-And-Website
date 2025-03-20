// Play background music on load
window.onload = function() {
    let music = document.getElementById("bg-music");
    music.volume = 0.5;
    music.play();
};

// Start the game when the button is clicked
document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("title-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";
    console.log("Game Started!");
});

// Game variables
let energy = 100;
let hunger = 50;

// Update HUD
function updateHUD() {
    document.getElementById("energy").textContent = energy;
    document.getElementById("hunger").textContent = hunger;
}

// Handle choices
function chooseOption(option) {
    let storyText = document.getElementById("story-text");

    if (option === 1) {
        storyText.textContent = "You cautiously follow the path, ears perked for any sign of danger.";
        energy -= 5;
    } else if (option === 2) {
        storyText.textContent = "You venture into the trees, feeling the damp leaves beneath your paws.";
        hunger -= 10;
    }

    updateHUD();
}
