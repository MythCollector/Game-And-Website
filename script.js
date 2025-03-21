// Game variables
let health = 100;
let soulPoints = 0;
let history = []; // Stores past states for undo

window.onload = function() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("identity-form").style.display = "none";
    document.getElementById("hud").style.display = "none";  // Hide HUD initially
};

// Start game when the button is clicked
document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("title-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";
    document.getElementById("hud").style.display = "block";  // Show HUD when game starts

    let music = document.getElementById("bg-music");
    music.volume = 0.5;
    music.play().catch(error => console.log("Music play blocked by browser. Click to start."));
});

function reachLake() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("hud").style.display = "none";  // Hide HUD during identity selection
    document.getElementById("identity-form").style.display = "flex";
}


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
        health: health,
        soulPoints: soulPoints,
        story: document.getElementById("story-text").textContent,
        choicesHTML: document.getElementById("choices").innerHTML
    });
}

// Function to trigger a random battle (30% chance)
function randomBattle() {
    let chance = Math.random();
    if (chance < 0.3) { // 30% chance to trigger a battle
        startBattle();
        return true; // Stop further execution of choices
    }
    return false;
}

// Function to start a battle
function startBattle() {
    let storyText = document.getElementById("story-text");
    let choicesDiv = document.getElementById("choices");

    // Random enemy level (1 to 5)
    let enemyLevel = Math.floor(Math.random() * 5) + 1;  
    let enemyHealth = enemyLevel * 25; // Higher level = more health

    storyText.textContent = `A level ${enemyLevel} beast appears! It looks ready to attack!`;
    choicesDiv.innerHTML = "";
    choicesDiv.appendChild(createButton("Fight", `fight-${enemyLevel}-${enemyHealth}`));
    choicesDiv.appendChild(createButton("Flee", "flee"));
}

// Handle choices and battle system
function chooseOption(option) {
    saveState();

    let storyText = document.getElementById("story-text");
    let choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = ""; // Clear old choices

    // Battle logic
    if (option.startsWith("fight")) {
        let splitData = option.split("-");
        let enemyLevel = parseInt(splitData[1]);  
        let enemyHealth = parseInt(splitData[2]);  

        let damage = Math.floor(Math.random() * 20) + 10; // Enemy deals 10-30 damage
        let playerDamage = Math.floor(Math.random() * 20) + 15; // Player deals 15-35 damage

        health -= damage;
        enemyHealth -= playerDamage;

        if (enemyHealth <= 0) {
            let soulPointsEarned = enemyLevel * 2; // Higher level = more Soul Points
            soulPoints += soulPointsEarned;

            storyText.textContent = `You defeated the level ${enemyLevel} beast! You gained ${soulPointsEarned} Soul Points!`;
            health += 10; // Restore some health
            if (health > 100) health = 100; // Cap health at 100
        } else {
            storyText.textContent = `The battle continues! The enemy has ${enemyHealth} health left.`;
            choicesDiv.appendChild(createButton("Attack again", `fight-${enemyLevel}-${enemyHealth}`));
        }
    } 
    else if (option === "flee") {
        let escapeChance = Math.random();
        if (escapeChance < 0.5) {
            storyText.textContent = "You successfully escaped!";
        } else {
            storyText.textContent = "You try to run, but the creature catches up!";
            choicesDiv.appendChild(createButton("Fight", "fight"));
        }
    } 
    else if (option === 1) {
        storyText.textContent = "You stand up, your legs shaky beneath you. The forest stretches endlessly around you.";
        choicesDiv.appendChild(createButton("Follow the trail", 3));
        choicesDiv.appendChild(createButton("Look for shelter", 4));
    } 
    else if (option === 3) {
        storyText.textContent = "You follow the trail deeper into the woods...";
        if (!randomBattle()) {
            choicesDiv.appendChild(createButton("Continue walking", 5));
        }
    }
    else if (option === 4) {
        storyText.textContent = "You find an abandoned den. It seems safe.";
        choicesDiv.appendChild(createButton("Rest here", 6));
    }
    else if (option === 5 || option === 6) {
        storyText.textContent = "You reach a lake. The water is crystal clear, reflecting the trees.";
        choicesDiv.appendChild(createButton("Look into the water", "reachLake"));
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
        health = lastState.health;
        soulPoints = lastState.soulPoints;
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

// Update HUD (health & soul points)
function updateHUD() {
    document.getElementById("health").textContent = health;
    document.getElementById("soul-points").textContent = soulPoints;
}



//else if (option === X) {
   // storyText.textContent = "Your new story part here...";
   // choicesDiv.appendChild(createButton("New Choice 1", Y));
    //choicesDiv.appendChild(createButton("New Choice 2", Z));
//}


