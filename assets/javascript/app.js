$(document).ready(function(){

	//creates object constructor to set up questions and answers
	function question_answer(question, ans0, ans1, ans2, ans3, img){
		this.question = question;	//stores question string
		
		this.ansArray = [			//stores answer string and boolean
						ans0,
						ans1,
						ans2,
						ans3
						]
		
		this.image = img;			//stores image to show on answer screen

		this.getAnswer = function(){	//method out puts the right answer

			if(this.ansArray[0][1]) return this.ansArray[0][0];
			if(this.ansArray[1][1]) return this.ansArray[1][0];
			if(this.ansArray[2][1]) return this.ansArray[2][0];
			if(this.ansArray[3][1]) return this.ansArray[3][0];
		}

		this.getImg = function(){		//method outputs image source string
			return "assets/images/"+this.image;
		}
	}//end of constructor

	var q = [];		//strores questions and answers
	var timerID;	//keeps track of setInterval function
	var time = 30;	//used to display countdown
	var qNum = 0;	//used to count question index
	var right = 0;	//keeps track of how many were right
	var wrong = 0;	//keeps track of how many were wrong
	var idk = 0;	//keeps track of how many were timed out

	//questions and answers
	q[0] = new question_answer("What is the Florida State Bird?", ["Mocking Bird", true], ["Cardinal", false], ["Flamingos", false], ["Ibis", false], "mockingbird.jpg");
	q[1] = new question_answer("What is the Largest City in Florida?", ["Orlando", false], ["Jacksonville", true], ["Miami", false], ["Tallahassee", false], "jacksonville.jpg");
	q[2] = new question_answer("Where is the best place to view Rocket Launches?", ["The Keys", false], ["Orlando", false], ["Tampa", false], ["Titusville", true], "titusville.jpg");
	q[3] = new question_answer("What year was Florida discovered?", ["1492", false], ["1513", true], ["1676", false], ["1845", false], "1513.jpg");
	q[4] = new question_answer("What is the Capital of Florida?", ["Miami", false], ["Tampa", false], ["Tallahassee", true], ["Orlando", false], "Tallahassee.jpg");
	q[5] = new question_answer("Which of these is NOT an original native to Florida?", ["Salt Water Marlin", false], ["Crocodiles", false], ["Brown Anole", true], ["Panthers", false], "BrownAnole.jpg");
	q[6] = new question_answer("What year did Florida become part of the United States?", ["1513", false], ["1789", false], ["1814", false], ["1845", true], "1845.jpg");
	q[7] = new question_answer("Which Florida teams won the most championships as of 2015?", ["Orlando Magic", false], ["Tampa Bay Lightning", false], ["Miami Marlins", false], ["Miami Heat", true], "MiamiHeat.jpg");
	q[8] = new question_answer("Florida is the _ most populated State as of 2015.", ["1st", false], ["3rd", true], ["6th", false], ["8th", false], "3rd.jpg");
	q[9] = new question_answer("What is the state flower?", ["Orange Blossom", true], ["Coreopsis", false], ["Hibiscus", false], ["Lily", false], "orange-blossom.jpg");


	$('.start').on("click", function(){//starts trival game on click

		setPage();
	});

	function setPage(){	//displays timer questions and answers
		
		$('#Timer')
			.html("<p>Time Remaining: "+ time +" Seconds");
		
		if(typeof(timerID) === 'undefined'){	//makes sure timeID is cleared 
			
			timerID = setInterval(function(){	//runs timer

				//time--;
				$('#Timer')
					.html("<p>Time Remaining: "+ --time +" Seconds"); //updates timer ever second

				if(time == 0){
					answerPage(q[qNum]);	//displayer answer page when time is up
				}
			}, 1000);	//1000ms = 1sec
		}//end of if 

		

		$('#Question')	//displays question
			.html("<p>"+ q[qNum].question +"</p>");
			
			for(var i = 0; i < 4; i++){
				
				$('#a'+(i+1))
					.html("<p>" + q[qNum].ansArray[i][0] + "</p>")
					.addClass("ans-button")
					.data("ansIs", q[qNum].ansArray[i][1])
					.on("click", function(){

						answerPage(q[qNum], $(this).data("ansIs"));
				});
			}
	}

	function answerPage(ans, bool){	//displays answer page
		
		clearInterval(timerID);	//clears time inerval
		timerID = undefined;	//cleats timerID variable

		//empty outs answer containers
		for(var i = 1; i <= 4; i++){

			$('#a'+i).off().removeClass("ans-button").empty();
		}
		
		if(bool == undefined){	//if time is up 
			$('#Question')
				.html("<h1>Time Up!</h1>");	//display to the user time is up

			$('#a1').html("<p>The Correct answer is: " + ans.getAnswer() + "</p>");	//display the right answer
			idk++;	//increment time out counter
		}
		else if(bool){	//if anser is correct
			$('#Question')
				.html("<h1>Correct!</h1>");	//display to the user that they are correct
			right++;	//increment counter
		}
		else{	//if answer is wrong
			$('#Question')
				.html("<h1>Wrong!</h1>");	//display to the user that they're wrong

			$('#a1').html("<p>The Correct answer is: " + ans.getAnswer() + "</p>");	//display the correct answer
			
			wrong++;	//increment counter
		}
		
		//display picture relating to the correct answer
		$('#a2').html("<img src='" +ans.getImg()+ "' class='img-responsive ans-pic' alt='answerpic'>")	

		qNum++; //increment question counter
		
		time = 30;	//reset timer
		
		(qNum < q.length) ? setTimeout(setPage, 5000) : setTimeout(endPage, 5000);
		
	}

	function endPage(){	//display final results
		$('#Question').html("<p>All Done! Here's the results</p>");

		$('#a1').html("<p>Correct Answers: " + right + "</p>");
		$('#a2').html("<p>Wrong Answers: " + wrong + "</p>");
		$('#a3').html("<p>Unanswered: " + idk + "</p>");
		$('#a4').addClass("ans-button").html("<h1>Try Again?</h1>").on("click", function(){	
			
			//resets counter variables and starts trivia again
			$('#a4').removeClass("ans-button");
			idk = 0;
			right = 0;
			wrong = 0;
			qNum = 0;
			setPage();


		});
	}
	
})