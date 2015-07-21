var secretNumber=0,
	minGuess = 1,
	maxGuess = 100,
	isGameOver = false;
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	generateNumber();
  	initializeCount();
  	$(".new").click(newGame);

  	$("form").submit(function(){
  		var userGuess = $("#userGuess").val();
  		if(isValidInput(userGuess)){
  			getFeedback(userGuess);
  		}
  		return false
  	});
});

function initializeCount(){
	var count = "10";
	$("#count").text(count);
}

function newGame(){
	setFeedback("Make your Guess!");
	$("#count").text("0");
	$("#userGuess").val("").removeAttr("disabled");;
	$("#guessList").empty();
	isGameOver = false;
	generateNumber();
  	initializeCount();
}

function getFeedback(userGuess){
	var difference = Math.abs(secretNumber - userGuess);
	decreaseCount();

	if(userGuess == secretNumber){
		setFeedback("Winner!");
		setGameOver
	}
	else if(Number($("#count").text()) == 0){
		setFeedback("You Lose!");
		setGameOver();
	}
	else if(difference >= 50){
		setFeedback("Ice Cold");
	}
	else if(difference >= 30){
		setFeedback("Cold");
	}
	else if(difference >=20){
		setFeedback("Warm");
	}
	else if(difference >= 10){
		setFeedback("Hot");
	}
	else if(difference >= 1){
		setFeedback("Very Hot");
	}
	
	addToGuessList(userGuess);
	$("#userGuess").val("");
}

function addToGuessList(userGuess){
	var newListItem = $("<li>").append(userGuess);
	$("#guessList").append(newListItem);
}

// function increaseCount(){
// 	var countContainer= $("#count");
// 	countContainer.text(Number(countContainer.text()) + 1);
// }

function decreaseCount(){
	var countContainer= $("#count");
	countContainer.text(Number(countContainer.text()) - 1);
}

function isValidInput(userGuess){
	var isValid = !isGameOver;
	if(isValid && !isValidNumber(userGuess)){
		setFeedback("Please enter a valid number between " + minGuess + " and " + maxGuess)
		isValid = false;
	}
	if(isValid && alreadyGuessed(userGuess)){
		setFeedback(userGuess + " has already been chosen");
		isValid = false;
	}
	
	return isValid;
}

function alreadyGuessed(userGuess){
	return $("#guessList").find("li").filter(function() {
	    return $(this).text() == userGuess;
	}).length > 0
}

function isValidNumber(userGuess){
	userGuess = parseInt(userGuess);
	return (!isNaN(userGuess) && (userGuess >= minGuess && userGuess <= maxGuess));
}

function setFeedback(msg){
	$("#feedback").text(msg);
}

function generateNumber(){
	secretNumber = Math.floor(Math.random() * (maxGuess - minGuess + 1)) + minGuess;
}

function setGameOver(){
	isGameOver = true;
	$("#userGuess").attr("disabled", "disabled"); 
}

