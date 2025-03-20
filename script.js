// Game variables
let energy = 100;
let hunger = 50;
let history = []; // Stores multiple past states

// Play background music when "Start Game" is clicked
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

// Store current game state before making a change
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
    saveState(); // Save the current state before making changes

    let storyText = document.getElementById("story-text");
    let choicesDiv = document.getElementById("choices");

    // Clear previous buttons
    choicesDiv.innerHTML = "";

    if (option === 1) {
        storyText.textContent = "You cautiously follow the path, ears perked for any sign of danger.";
        energy -= 5;
        choicesDiv.innerHTML += `<button class="choice-btn" onclick="chooseOption(3)">Continue walking</button>`;
    } else if (option === 2) {
        storyText.textContent = "You venture into the trees, feeling the damp leaves beneath your paws.";
        hunger -= 10;
        choicesDiv.innerHTML += `<button class="choice-btn" onclick="chooseOption(4)">Search for food</button>`;
    } else if (option === 3) {
        storyText.textContent = "You keep moving forward, feeling the wind against your fur.";
        energy -= 5;
        choicesDiv.innerHTML += `<button class="choice-btn" onclick="chooseOption(5)">Look around</button>`;
    } else if (option === 4) {
        storyText.textContent = "You sniff the air and spot a small prey animal nearby.";
        hunger += 10;
        choicesDiv.innerHTML += `<button class="choice-btn" onclick="chooseOption(6)">Attempt to catch it</button>`;
    }

    updateHUD();
}

// Undo last choice
document.getElementById("undo-button").addEventListener("click", function() {
    if (history.length > 0) {
        let lastState = history.pop(); // Go back one step
        energy = lastState.energy;
        hunger = lastState.hunger;
        document.getElementById("story-text").textContent = lastState.story;
        document.getElementById("choices").innerHTML = lastState.choicesHTML;
        updateHUD();
    }
});
