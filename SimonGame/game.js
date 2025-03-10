//$("h1").css("color", "black");
//make a simon game: which follow the color flashing 
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStart = false;

$(".btn").click(function(){
    // alert("Button clicked!");

    var userChosenColour = $(this).attr("id"); ;
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour); 
    // console.log(userClickedPattern);
    // removedPressed = $(this).addClass("pressed");

    // setTimeout(function(){
    //     removedPressed.removeClass('pressed');
        
    // }, 50);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
 })

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
    // var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
    // audio.play();
   // console.log(randomChosenColour);
   playSound(randomChosenColour);
}
//nextSequence();

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

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