var secretNumber=0;
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

  	$("form").submit(function(e){
  		getFeedback();
  		return false
  	});
});

function newGame(){
	$("#feedback").text("Make your Guess!");
	$("#count").text("0");
	$("#userGuess").val("");
	generateNumber();
}

function generateNumber(){
	var max = 100, min = 1;
	secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFeedback(){
	var difference = Math.abs(secretNumber - $("#userGuess").val()),
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

	increaseCount();
}

function increaseCount(){
	var countContainer= $("#count");
	countContainer.text(+countContainer.text() + 1);
}


