// Tic Tac Toe
// Michael McClure

// FUNCTIONS
// Play Function
var playBox = function(turn, x, o) {

	if (this.innerHTML !== "X" && this.innerHTML !== "O") {
		if (turn) {
			x += this.innerHTML;		// Swap out num in box
			this.style.color='pink';// for colored
			this.innerHTML = "X";		// letter
			if (winner(x)) alert("X WINS!!!"); // Is it a winning play?
			return [false, x, o,"Second Player's Turn", 
													'rgba(96, 146, 225, .4)'];
		} else {
			o += this.innerHTML;		// Other player
			this.style.color='#5c64ff';
			this.innerHTML = "O";
			if (winner(o)) alert("O WINS!!!");
			return [true, x, o, "First Player's Turn", 
													'rgba(211, 136, 196, .4)'];
		}
	}
	return;
}
// Winner Function
var winner = function(score) {
	var wins = ["123","456","789","147","258","369","159","357"];

	// Check every number within every number for the win pattern
	for (var i = 0; i < wins.length; i++) {
		for (var n = 0, count = 0; n < wins[i].length; n++) {
			if (score.indexOf(wins[i][n]) > -1) count++;
			if (count === 3) return true;
		}
	}
	// If board is full without a win, it's a tie!
	if (score.length === 5) {
		alert("TIE!!! EVERYBODY'S TOO SMART!");
	}	
	return false;
}

// BROWSER
window.onload = function() {
	var box = document.getElementsByClassName("box"),
		play = 	document.getElementById('display'),
		reset = document.getElementById('reset');
// playerInfo [0]bool, [1]scoreOne, [2]scoreTwo, [3]playerTurn, [4]playerColor
	var	playerInfo = [true, '', '', "First Player's Turn", 
																	'rgba(211, 136, 196, .5)'];

// Hidden Elements
	reset.style.visibility = 'hidden'; // Don't need to see this now

// Play Game
	play.onclick = function() {
		play.innerHTML = playerInfo[3];
		play.style.background = playerInfo[4];
	}

	for( var num = 0; num <= 8; num++ ) { 
			box[num].onclick = function(){
				if (!isNaN(this.innerHTML)) { // Error Handling
					playerInfo = playBox.call(this, playerInfo[0], 
																					playerInfo[1], 
																					playerInfo[2]);
					play.innerHTML = playerInfo[3];
					play.style.background = playerInfo[4];
					reset.style.visibility = 'visible'; // Now this is an option
				};
			};
	}

// Reset Game
	reset.onclick = function() {
		play.innerHTML = "Want To Play Again? &nbsp&nbsp Click me!";
		reset.style.visibility = 'hidden'; // Original state

		for ( var num in box ) { 
			if (box[num].className === 'box') { // Error Handling
				box[num].style.color = 'black';
				box[num].innerHTML = (parseInt(num) + 1).toString();
				play.style.background = 'rgba(0,0,0,0)';
				playerInfo = [true, '', '', "First Player's Turn", 
																		'rgba(211, 136, 196, .5)'];
			};
		} 		
	}



}

// What I learned:
// Passing 'this' into a function() using call()
// Iterating onclick through several buttons AND within one click
// DOM Methods
// indexOf() to check if something is in the contents of a string
// isNaN() to check if string is a number
