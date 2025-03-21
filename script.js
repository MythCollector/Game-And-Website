// Game variables
let energy = 100;
let hunger = 50;
let history = []; // Stores past states
let reachedLake = false; // Track if player has reached the lake

// Ensure correct screens are shown at start
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

// Character Customization Logic
document.getElementById("species-select").addEventListener("change", updateCharacterPreview);
document.getElementById("fur-color-select").addEventListener("change", updateCharacterPreview);
document.getElementById("eye-color-select").addEventListener("change", updateCharacterPreview);

function updateCharacterPreview() {
    let species = document.getElementById("species-select").value;
    let furColor = document.getElementById("fur-color-select").value;
    
    let imagePath = `characters/${species}_${furColor}.png`;
    document.getElementById("character-preview").src = imagePath;
}

// Confirm Character and Continue Game
document.getElementById("confirm-character").addEventListener("click", function() {
    document.getElementById("customization-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";

    let selectedSpecies = document.getElementById("species-select").value;
    let selectedFur = document.getElementById("fur-color-select").value;
    let imagePath = `characters/${selectedSpecies}_${selectedFur}.png`;

    document.getElementById("character-space").innerHTML = `<img id="character-img" src="${imagePath}" alt="Character">`;
});
