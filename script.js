// Game variables
let energy = 100;
let hunger = 50;
let history = []; // Stores past states for undo

// Ensure the correct screens are shown at the start
window.onload = function() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("identity-form").style.display = "none";
};

// Start game when the button is clicked
document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("title-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";

    let music = document.getElementById("bg-music");
    music.volume = 0.5;
    music.play().catch(error => console.log("Music play blocked by browser. Click to start."));
});

// Function to create buttons dynamically
function createButton(text, optionNumber) {
    let button = document.createElement("button");
    button.textContent = text;
    button.classList.add("choice-btn");
    button.onclick = function() { chooseOption(optionNumber); };
    return button;
}

// Store game state before making a change (for undo)
function saveState() {
    history.push({
        energy: energy,
        hunger: hunger,
        story: document.getElementById("story-text").textContent,
        choicesHTML: document.getElementById("choices").innerHTML
    });
}

// Handle choices and story progression
function chooseOption(option) {
    saveState(); // Save the current state before making changes

    let storyText = document.getElementById("story-text");
    let choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = ""; // Clear old choices

    if (option === 1) {
        storyText.textContent = "You stand up, your legs shaky beneath you. The forest stretches endlessly around you.";
        choicesDiv.appendChild(createButton("Follow the trail", 3));
        choicesDiv.appendChild(createButton("Look for food", 4));
    } 
    else if (option === 2) {
        storyText.textContent = "You stay still, listening to the sounds of the forest.";
        choicesDiv.appendChild(createButton("Move toward the water", 5));
        choicesDiv.appendChild(createButton("Stay and observe", 6));
    } 
    else if (option === 3) {
        storyText.textContent = "The path winds through the forest. Suddenly, you hear a rustling in the bushes.";
        choicesDiv.appendChild(createButton("Investigate the noise", 7));
        choicesDiv.appendChild(createButton("Ignore it and keep walking", 8));
    }
    else if (option === 4) {
        storyText.textContent = "You sniff the air, looking for food. You spot some berries nearby.";
        choicesDiv.appendChild(createButton("Eat the berries", 9));
        choicesDiv.appendChild(createButton("Keep searching", 10));
    }
    else if (option === 5 || option === 6) {
        storyText.textContent = "You reach a lake. The water is crystal clear, reflecting the trees.";
        choicesDiv.appendChild(createButton("Look into the water", "reachLake"));
    } 
    else if (option === 7) {
        storyText.textContent = "You step closer. A pair of glowing eyes stare back at you.";
        choicesDiv.appendChild(createButton("Run away!", 11));
        choicesDiv.appendChild(createButton("Stand your ground", 12));
    } 
    else if (option === 11) {
        storyText.textContent = "You run as fast as you can, not looking back.";
        choicesDiv.appendChild(createButton("Find a hiding spot", 13));
    }
    else if (option === 12) {
        storyText.textContent = "The glowing eyes blink, and a wolf steps out, tilting its head at you.";
        choicesDiv.appendChild(createButton("Try to communicate", 14));
    } 
    else if (option === "reachLake") {
        reachLake(); // Start identity selection
    }

    updateHUD();
}

// Undo last choice (back to previous state)
document.getElementById("undo-button").addEventListener("click", function() {
    if (history.length > 0) {
        let lastState = history.pop();
        energy = lastState.energy;
        hunger = lastState.hunger;
        document.getElementById("story-text").textContent = lastState.story;
        document.getElementById("choices").innerHTML = lastState.choicesHTML;
        updateHUD();
    }
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
    document.getElementById("choices").innerHTML = "";
    document.getElementById("choices").appendChild(createButton("Continue", 15));
});

// Update HUD (energy & hunger)
function updateHUD() {
    document.getElementById("energy").textContent = energy;
    document.getElementById("hunger").textContent = hunger;
}
