var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

// keep track if game has started or not
var started = false;
// start level at 0
var level = 0;
 
// Detect when a keyboard key has been pressed, when pressed for the first time, call nextSequence
$(document).keypress(function() {
  if (!started) {
    // change h1 title to Level 0 when starting the game
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// detect when button is clicked and trigger handler function
$(".btn").on("click", function() {

  // store the id of the clicked button
  var userChosenColour = $(this).attr("id");
  // push userChosenColour to userClickedPattern
  userClickedPattern.push(userChosenColour);
  
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // pass in the index of the last answer in the user's sequence after user has clicked their answer.
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

  // check if user's answer is the same as game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    // if user answer is correct, check if they have finished their sequence
    if (userClickedPattern.length === gamePattern.length) {

      // call nextSequence() after 1000 millisecond delay
      setTimeout(function () {
        nextSequence();
      }, 1000)
    }

  } else {
    // if user's answer is wrong
    console.log("wrong");
    playSound("wrong");

    // change game background with the "game-over" class for 200 milliseconds
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // change h1 title to say "Game over, Press any ket to restart"
    $("#level-title").text("Game Over, Press Any Key To Restart");

    // restart game
    startOver();
  }

}


function nextSequence() {

  // reset userClickedPattern to empty array for next level when nextSequence() is triggered
  userClickedPattern = [];

  // increase level by 1 every time nextSequence is called
  level++;
  // update the level change
  $("#level-title").text("Level " + level);

  // generate random number from 0 to 3
  var randomNumber = Math.floor(Math.random() * 4);
  // use randomNumber to select a random colour
  var randomChosenColour = buttonColours[randomNumber];
  // push randomChosenColor to game pattern
  gamePattern.push(randomChosenColour);

  // select button with same id as randomChosenColour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // play corresponding sound when button is clicked
  playSound(randomChosenColour);
}

function startOver() {

  // reset all values
  level = 0;
  gamePattern = [];
  started = false;

}

// play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// animate the button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

