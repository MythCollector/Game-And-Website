// Play background music on load
window.onload = function() {
    let music = document.getElementById("bg-music");
    music.volume = 0.5;  // Set volume to half
    music.play();
};

// Start button functionality
document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("title-screen").style.display = "none";
    // Here we will load the main game screen later
    console.log("Game Started!"); 
});
