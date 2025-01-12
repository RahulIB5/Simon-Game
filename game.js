var ButtonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isStarted = false;
var level = 0;
var highScore = 0;

$(document).keypress(function(event) {
    if (!isStarted) {
  
      $("#level-title").text("Level " + level);
      nextSequence();
      isStarted = true;
    }

    else {
        var userChosenColour = keyboard(event.key);
        if (userChosenColour) { // Only process valid keys
            userClickedPattern.push(userChosenColour);
            playSound(userChosenColour);
            animatePress(userChosenColour);
            CheckAns(userClickedPattern.length - 1);
        }
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    CheckAns(userClickedPattern.length-1);
});


function keyboard(key){

    switch (key) {
        case "a":
            return "green";
            break;

        case "s":
            return "red";
            break;
        
        case "d":
            return "yellow";
            break;

        case "f":
            return "blue";
            break;

        default: return null;
    }
}

function CheckAns(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }}

        else{

            var audio = new Audio("sounds/wrong.mp3");
            audio.play();

            $("body").addClass("game-over");

            setTimeout( function() {
            $("body").removeClass("game-over");
            },200);
            
            $("h1").text("Game Over, Press Any Key to Restart");

            startOver();
          }

    }


function nextSequence(){
    userClickedPattern = [];

    level += 1;
    highScore += 1;
    $("h1").text("Level " + level);

    $("h4").text("High Score: " + highScore);

    randomNumber = Math.floor(Math.random()*4);
    randomColorChosen = ButtonColors[randomNumber];
    gamePattern.push(randomColorChosen);
    $("#" + randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColorChosen);
    
}

function playSound(e){
    var audio = new Audio("sounds/" + e + ".mp3");
    audio.play();
}

function animatePress(e){
    $("#" + e).addClass("pressed");

    setTimeout( function() {
        $("#" + e).removeClass("pressed");
    });
}

function startOver() {
    level = 0;
    gamePattern = [];
    isStarted = false;
}

















  
