// array for colors
const buttonColors = ["red", "blue", "green", "yellow"];

//arrays for player and game pattern
let gamePattern = [];
let userPattern = [];

// variables for logic for level count and restarting game
let isPlaying = false;
let level = 0;
let lost = false;

// play the sound based on input color
function playSound(color) {
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

// creates the animation for clicking a button/ when the game chooses a button
function animateButton(color) {
    let button = document.querySelector(`#${color}`);
    button.classList.add("pressed");
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 100);
}

// reset the player pattern and add a new color to the games pattern
function nextSequence() {
    userPattern = [];
    let randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);
    animateButton(randomColor);
    playSound(randomColor);
    level++;
    document.querySelector("#level-title").innerHTML = `Level ${level}`;
}   

// start the game over
function startOver(){
    level = 0;
    gamePattern = [];
    isPlaying = false;
}

// check the users current answer against the games current answer. additional check 
//  for if the player is done with their sequence.
function checkAnswer(currentLevel){
    if(userPattern[currentLevel] === gamePattern[currentLevel]){
       if(userPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
       }
    } else {
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        document.querySelector("#level-title").innerHTML = "Game Over, Press Any Key to Restart"
        
        setTimeout(() => {
            document.querySelector("body").classList.remove("game-over");
        }, 200);
        
        lost = true;
    }
}

// add the key event listener, checks for if the game is currently running or if the player has lost
document.addEventListener("keydown", () => {
    if (!isPlaying){
        isPlaying = true;
        nextSequence();
        document.querySelector("#level-title").innerHTML = `Level ${level}`;
    }

    if(lost){
        startOver();
        lost = false;
    }
})

// add click event listeners to the buttons
const buttons = document.querySelectorAll(".btn");

buttons.forEach(i => {
    i.addEventListener("click", () => {
        let userClicked = i.id;
        userPattern.push(userClicked);
        playSound(userClicked);
        animateButton(userClicked);
        checkAnswer(userPattern.length - 1);
    })
});
