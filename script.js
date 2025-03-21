// Game variables
let health = 100;
let soulPoints = 0;
let history = [];

// Ensure correct screens are shown at the start
window.onload = function() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("identity-form").style.display = "none";
    document.getElementById("hud").style.display = "none";
};

// Start game
document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("title-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";
    document.getElementById("hud").style.display = "block";
});

// Random Battle (30% chance)
function randomBattle() {
    if (Math.random() < 0.3) {
        startBattle();
        return true;
    }
    return false;
}

// Start a battle
function startBattle() {
    let storyText = document.getElementById("story-text");
    let choicesDiv = document.getElementById("choices");

    let enemyLevel = Math.floor(Math.random() * 5) + 1;
    let enemyHealth = enemyLevel * 25;

    storyText.textContent = `A level ${enemyLevel} beast appears!`;
    choicesDiv.innerHTML = "";
    choicesDiv.appendChild(createButton("Fight", "fight"));
    choicesDiv.appendChild(createButton("Flee", "flee"));
}

// Handle choices
function chooseOption(option) {
    saveState();
    let storyText = document.getElementById("story-text");
    let choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    if (option === "fight") {
        let damage = Math.floor(Math.random() * 20) + 10;
        let playerDamage = Math.floor(Math.random() * 20) + 15;
        health -= damage;

        storyText.textContent = "You fought bravely!";
        choicesDiv.appendChild(createButton("Continue", 5));
    } 
    else if (option === "flee") {
        storyText.textContent = Math.random() < 0.5 ? "You escaped!" : "The creature catches you!";
        choicesDiv.appendChild(createButton("Continue", 5));
    } 
    updateHUD();
}

// Undo last choice
document.getElementById("undo-button").addEventListener("click", function() {
    if (history.length > 0) {
        let lastState = history.pop();
        health = lastState.health;
        soulPoints = lastState.soulPoints;
        updateHUD();
    }
});

// Update HUD
function updateHUD() {
    document.getElementById("health").textContent = health;
    document.getElementById("soul-points").textContent = soulPoints;
}


//else if (option === X) {
   // storyText.textContent = "Your new story part here...";
   // choicesDiv.appendChild(createButton("New Choice 1", Y));
    //choicesDiv.appendChild(createButton("New Choice 2", Z));
//}


