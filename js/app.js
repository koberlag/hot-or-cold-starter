var secretNumber=0,
	minGuess = 1,
	maxGuess = 100;
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
  	$(".new").click(newGame);

  	$("form").submit(function(){
  		var userGuess = $("#userGuess").val();
  		if(isValidInput(userGuess)){
  			getFeedback(userGuess);
  		}
  		return false
  	});
});

function newGame(){
	setFeedback("Make your Guess!");
	$("#count").text("0");
	$("#userGuess").val("");
	$("#guessList").empty();
	generateNumber();
}

function generateNumber(){
	secretNumber = Math.floor(Math.random() * (maxGuess - minGuess + 1)) + minGuess;
}

function getFeedback(userGuess){
	var difference = Math.abs(secretNumber - userGuess),
		feedback   = $("#feedback");

	if(difference >= 50){
		feedback.text("Ice Cold");
	}
	else if(difference >= 30){
		feedback.text("Cold");
	}
	else if(difference >=20){
		feedback.text("Warm");
	}
	else if(difference >= 10){
		feedback.text("Hot");
	}
	else if(difference >= 1){
		feedback.text("Very Hot");
	}
	else if(difference == 0){
		feedback.text("Winner!");
	}
	addToGuessList(userGuess);
	increaseCount();
}

function addToGuessList(userGuess){
	var newListItem = $("<li>").append(userGuess);
	$("#guessList").append(newListItem);
}

function increaseCount(){
	var countContainer= $("#count");
	countContainer.text(+countContainer.text() + 1);
}

function isValidInput(userGuess){
	var isValid = true;
	if(!isValidNumber(userGuess)){
		setFeedback("Please enter a valid number between " + minGuess + " and " + maxGuess)
		isValid = false;
	}
	if(alreadyGuessed(userGuess)){
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
	userGuess = +userGuess;
	return (userGuess % 1 == 0) && (userGuess >= minGuess && userGuess <= maxGuess);
}

function setFeedback(msg){
	$("#feedback").text(msg);
}

