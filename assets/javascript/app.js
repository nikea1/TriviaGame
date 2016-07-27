$(document).ready(function(){

function question_answer(question, ans1, ans2, ans3, ans4){
	this.question = question;
	this.answer1 = ans1;
	this.answer2 = ans2;
	this.answer3 = ans3;
	this.answer4 = ans4;





}

var q = [];
var timerID;
var time = 30;
var wait;
var qNum = 0;

q[0] = new question_answer("Question1", ["ans0", true], ["ans1", false], ["ans2", false], ["ans3", false]);
q[1] = new question_answer("Question2", ["ans4", true], ["ans5", false], ["ans6", false], ["ans7", false]);
q[2] = new question_answer("Question3", ["ans8", true], ["ans9", false], ["ansa", false], ["ansb", false]);
q[3] = new question_answer("Question4", ["ansc", true], ["ansd", false], ["anse", false], ["ansf", false]);
q[4] = new question_answer("Question5", ["ans0", true], ["ans1", false], ["ans2", false], ["ans3", false]);


$('.start').on("click", function(){

	setPage();
})

function setPage(){
	
	$('#Timer')
			.html("<p> Time :"+ time +" Seconds");
	
	if(typeof(timerID) === 'undefined'){
	timerID = setInterval(function(){

		//time--;
		$('#Timer')
			.html("<p> Time :"+ --time +" Seconds");

		if(time == 0){
			//clearInterval(timerID);
			answerPage();
		}
	}, 1000);
}

	

	$('#Question')
		.html("<p>"+ q[qNum].question +"</p>");

	$('#a1')
		.html("<p>" + q[qNum].answer1[0] + "</p>")
		.off()
		.on("click", function(){
			//clearInterval(timerID);
			answerPage(q[qNum].answer1[0], q[qNum].answer1[1]);
		});

	$('#a2')
		.html("<p>" + q[qNum].answer2[0] + "</p>")
		.off()
		.on("click", function(){
			//clearInterval(timerID);
			answerPage(q[qNum].answer2[0], q[qNum].answer2[1]);
		});

	$('#a3')
		.html("<p>" + q[qNum].answer3[0] + "</p>")
		.off()
		.on("click", function(){
			//clearInterval(timerID);
			answerPage(q[qNum].answer3[0], q[qNum].answer3[1]);
		});

	$('#a4')
		.html("<p>" + q[qNum].answer4[0] + "</p>")
		.off()
		.on("click", function(){

			answerPage(q[qNum].answer4[0], q[qNum].answer4[1]);
		});



}

function answerPage(ans, bool){
	
	clearInterval(timerID);
	timerID = undefined;
	$('#Question')
		.html("<p>result</p>");

	$('#a1').empty();
	$('#a2').empty();
	$('#a3').empty();
	$('#a4').empty();
	
	qNum++;

	if(qNum < 5){
		time = 30;
		setTimeout(setPage, 5000);
	}
	else{
		setTimeout(endPage, 5000);
	}

	
	
}

function endPage(){
	$('#Question').html("<p>All Done</p>")
}

	
})