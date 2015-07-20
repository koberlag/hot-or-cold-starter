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

function getFeedback(userGuess){
	var difference = Math.abs(secretNumber - userGuess),
		guessListItems = $("#guessList").find("li"),
		previousGuess = guessListItems.last().text(),
		previousDifference = Math.abs(secretNumber - previousGuess);

	if(userGuess == secretNumber){
		setFeedback("Winner!");
	}
	else if(guessListItems.length == 0 || difference == previousDifference){
		getAbsoluteFeedback(userGuess, difference)
	}
	else{
		difference > previousDifference ?  setFeedback("Colder") : setFeedback("Warmer");
	}
	addToGuessList(userGuess);
	increaseCount();
}

function getAbsoluteFeedback(userGuess, difference){
	if(difference >= 50){
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

function generateNumber(){
	secretNumber = Math.floor(Math.random() * (maxGuess - minGuess + 1)) + minGuess;
}

