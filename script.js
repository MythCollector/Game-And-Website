// Game variables
let energy = 100;
let hunger = 50;
let history = [];
let reachedLake = false;

// Ensure only the title screen is visible at first
window.onload = function() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("customization-screen").style.display = "none";
};

// Start the game when the button is clicked
document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("title-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";

    let music = document.getElementById("bg-music");
    music.volume = 0.5;
    music.play().catch(error => console.log("Music play blocked by browser."));
});

// Update HUD
function updateHUD() {
    document.getElementById("energy").textContent = energy;
    document.getElementById("hunger").textContent = hunger;
}

// Store game state before changes
function saveState() {
    history.push({
        energy: energy,
        hunger: hunger,
        story: document.getElementById("story-text").textContent,
        choicesHTML: document.getElementById("choices").innerHTML
    });
}

// Handle choices
function chooseOption(option) {
    saveState();

    let storyText = document.getElementById("story-text");
    let choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    if (option === 1) {
        storyText.textContent = "You stand up, your body trembling. The forest stretches endlessly around you. You spot a faint trail leading deeper into the woods.";
        choicesDiv.innerHTML += `<button class="choice-btn" onclick="chooseOption(3)">Follow the trail</button>`;
    } else if (option === 2) {
        storyText.textContent = "You remain still, listening to the wind rustling the trees. Somewhere in the distance, you hear water flowing.";
        choicesDiv.innerHTML += `<button class="choice-btn" onclick="chooseOption(4)">Move toward the sound of water</button>`;
    } else if (option === 3 || option === 4) {
        storyText.textContent = "After wandering for what feels like hours, you come across a shimmering lake. The water is so still, it’s like a mirror...";
        choicesDiv.innerHTML += `<button class="choice-btn" onclick="reachLake()">Look into the water</button>`;
    }
    
    updateHUD();
}

// Trigger character customization at the lake
function reachLake() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("customization-screen").style.display = "flex";
}

// Character Customization Logic (Canvas Coloring)
document.getElementById("species-select").addEventListener("change", updateCharacterCanvas);
document.getElementById("fur-color-select").addEventListener("change", updateCharacterCanvas);
document.getElementById("eye-color-select").addEventListener("change", updateCharacterCanvas);

function updateCharacterCanvas() {
    let furColor = document.getElementById("fur-color-select").value;
    let eyeColor = document.getElementById("eye-color-select").value;
    let canvas = document.getElementById("characterCanvas");
    let ctx = canvas.getContext("2d");

    let img = new Image();
    img.src = "characters/wolf_base.png"; // Load the base image

    img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Apply fur color overlay
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = furColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-over";

        // Apply eye color
        ctx.fillStyle = eyeColor;
        ctx.beginPath();
        ctx.arc(100, 120, 5, 0, Math.PI * 2);
        ctx.fill();
    };
}

// Confirm Character and Continue Game
document.getElementById("confirm-character").addEventListener("click", function() {
    document.getElementById("customization-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";
});
