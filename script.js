// Game variables
let energy = 100;
let hunger = 50;
let history = [];

// Ensure only the title screen is visible at first
window.onload = function() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("identity-form").style.display = "none";
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

document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("title-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";

    let music = document.getElementById("bg-music");
    music.volume = 0.5;
    music.play().catch(error => console.log("Music play blocked by browser."));
});

// Show identity form at the lake
function reachLake() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("identity-form").style.display = "flex";
}

// Save identity and update HUD
document.getElementById("confirm-identity").addEventListener("click", function() {
    let species = document.getElementById("species-input").value.trim() || "Unknown";
    let skinType = document.getElementById("skin-type-input").value.trim() || "Unknown";
    let furColor = document.getElementById("fur-color-input").value.trim() || "Unknown";
    let eyeColor = document.getElementById("eye-color-input").value.trim() || "Unknown";

    document.getElementById("species").textContent = species;
    document.getElementById("skin-type").textContent = skinType;
    document.getElementById("fur-color").textContent = furColor;
    document.getElementById("eye-color").textContent = eyeColor;

    document.getElementById("identity-form").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";

    document.getElementById("story-text").textContent = `As you stare at your reflection, memories start to return... You are a ${species} with ${furColor} ${skinType}.`;
});

    // Continue the game after identity selection
    document.getElementById("story-text").textContent = "As you stare at your reflection, memories start to return... You are a " + species + ".";
    document.getElementById("choices").innerHTML = `<button class="choice-btn" onclick="chooseOption(5)">Continue</button>`;
});

// Confirm Character and Continue Game
document.getElementById("confirm-character").addEventListener("click", function() {
    document.getElementById("customization-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";
});
