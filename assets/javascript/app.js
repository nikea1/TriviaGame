$(document).ready(function(){

function question_answer(question, ans1, ans2, ans3, ans4){
	this.question = question;
	this.answer1 = ans1;
	this.answer2 = ans2;
	this.answer3 = ans3;
	this.answer4 = ans4;

	this.getAnswer = function(){

		if(ans1[1]) return ans1[0];
		if(ans2[1]) return ans2[0];
		if(ans3[1]) return ans3[0];
		if(ans4[1]) return ans4[0];
	}



}

var q = [];
var timerID;
var time = 30;
var wait;
var qNum = 0;
var right = 0;
var wrong = 0;
var idk = 0;

q[0] = new question_answer("What is the Florida State Bird?", ["Mocking Bird", true], ["Cardinal", false], ["Flamingos", false], ["Ibis", false]);
q[1] = new question_answer("What is the Largest City in Florida?", ["Orlando", false], ["Jacksonville", true], ["Miami", false], ["Tallahassee", false]);
q[2] = new question_answer("Where is the best place to view Rocket Launches?", ["The Keys", false], ["Orlando", false], ["Tampa", false], ["Titusville", true]);
q[3] = new question_answer("What year was Florida discovered?", ["1492", false], ["1513", true], ["1676", false], ["1845", false]);
q[4] = new question_answer("What is the Capital of Florida?", ["Miami", false], ["Tampa", false], ["Tallahassee", true], ["Orlando", false]);
q[5] = new question_answer("Which of these is NOT an original native to Florida?", ["Salt Water Marlin", false], ["Crocodiles", false], ["Brown Anole", true], ["panthers", false]);
q[6] = new question_answer("What year did Florida become part of the United States?", ["1513", false], ["1789", false], ["1814", false], ["1845", true]);
q[7] = new question_answer("Which Florida teams won the most championships as of 2015?", ["Orlando Magic", false], ["Tampa Bay Lightning", false], ["Miami Marlins", false], ["Miami Heat", true]);
q[8] = new question_answer("Florida is the _ most populated State as of 2015.", ["1st", false], ["4th", true], ["6th", false], ["8th", false]);
q[9] = new question_answer("What is the state flower?", ["Orange Blossom", true], ["Coreopsis", false], ["Hibiscus", false], ["Lily", false]);

$('.start').on("click", function(){

	setPage();
})

function setPage(){
	
	$('#Timer')
		.html("<p>Time Remaining: "+ time +" Seconds");
	
	if(typeof(timerID) === 'undefined'){
		timerID = setInterval(function(){

			//time--;
			$('#Timer')
				.html("<p>Time Remaining: "+ --time +" Seconds");

			if(time == 0){
				//clearInterval(timerID);
				answerPage(q[qNum]);
			}
		}, 1000);
	}

	

	$('#Question')
		.html("<p>"+ q[qNum].question +"</p>");

	$('#a1')
		.html("<p>" + q[qNum].answer1[0] + "</p>")
		.addClass("ans-button")
		.on("click", function(){
			
			answerPage(q[qNum], q[qNum].answer1[1]);
		});

	$('#a2')
		.html("<p>" + q[qNum].answer2[0] + "</p>")
		.addClass("ans-button")
		.on("click", function(){
			
			answerPage(q[qNum], q[qNum].answer2[1]);
		});

	$('#a3')
		.html("<p>" + q[qNum].answer3[0] + "</p>")
		.addClass("ans-button")
		.on("click", function(){
			
			answerPage(q[qNum], q[qNum].answer3[1]);
		});

	$('#a4')
		.html("<p>" + q[qNum].answer4[0] + "</p>")
		.addClass("ans-button")
		.on("click", function(){

			answerPage(q[qNum], q[qNum].answer4[1]);
		});



}

function answerPage(ans, bool){
	
	clearInterval(timerID);
	timerID = undefined;
	$('#Question')
		.html("<p>result</p>");

	$('#a1').off().removeClass("ans-button").empty();
	$('#a2').off().removeClass("ans-button").empty();
	$('#a3').off().removeClass("ans-button").empty();
	$('#a4').off().removeClass("ans-button").empty();
	
	if(bool == undefined){
		$('#Question')
			.html("<h1>Time Up!</h1>");

		$('#a1').html("<p>The Correct answer is: " + ans.getAnswer() + "</p>");
		idk++;
	}
	else if(bool){
		$('#Question')
			.html("<h1>Correct!</h1>");
		right++;
	}
	else{
		$('#Question')
			.html("<h1>Wrong!</h1>");

		$('#a1').html("<p>The Correct answer is: " + ans.getAnswer() + "</p>");
		
		wrong++;
	}



	qNum++;

	if(qNum < q.length){
		time = 30;

		setTimeout(setPage, 5000);
	}
	else{
		setTimeout(endPage, 5000);
	}

	
	
}

function endPage(){
	$('#Question').html("<p>All Done! Here's the results</p>");

	$('#a1').html("<p>Correct Answers: " + right + "</p>");
	$('#a2').html("<p>Wrong Answers: " + wrong + "</p>");
	$('#a3').html("<p>Unanswers: " + idk + "</p>");
	$('#a4').addClass("ans-button").html("<h1>Try Again?</h1>").on("click", function(){

		$('#a4').removeClass("ans-button");
		idk = 0;
		right = 0;
		wrong = 0;
		time = 30
		qNum = 0;
		setPage();


	});
}


	
})