
// store color randomly
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStart = false;

// to click in the color to follow the pattern
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour); 
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
 })

 // press on any key to start the game
  $(document).keydown (function() {
    if(!gameStart){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
  });

// create a fuction the rendomly flashing the button and make sound.
function nextSequence(){
    userClickedPattern = [];
    level++;
   $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * buttonColours.length);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);  
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    
   playSound(randomChosenColour);
}

// to play a sound for a choosing colore
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

// to animate the color that the user presed for 100ms and than remove it. 
function animatePress(currentColour){
    
      $("#" + currentColour ).addClass("pressed");
    
        setTimeout(function(){
            $("#" + currentColour ).removeClass('pressed');
            
        }, 100);
}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 100);
            
        }
    }else{
        console.log("wrong");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play(); 
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
level = 0;
gamePattern = [];
gameStart = false;
}