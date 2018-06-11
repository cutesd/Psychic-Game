
//
var PsychicGame = function (options) {

    var winCnt = 0;
    var loseCnt = 0;
    var remain = 0;
    var guesses = [];
    var answer = "";

    var winOut = document.getElementById('winOut');
    var loseOut = document.getElementById('lossOut');
    var remainOut = document.getElementById('remainOut');
    var guessOut = document.getElementById('guessOut');

    this.play = function () {
        startGame();
    }

    this.guess = function (ltr) {
        if (ltr === answer) {
            winGame();
        } else {
            wrongAnswer(ltr);
        }
    }

    function startGame() {
        remain = options.NumGuesses;
        guesses = [];
        var abc = "abcdefghiklmnopqrstuvwxyz";
        var rnum = Math.floor(Math.random() * abc.length);
        answer = abc.substr(rnum, 1);
        // leaving this in for ease of testing functionality
        console.log(answer);
        display();
    }

    function display() {
        winOut.textContent = winCnt;
        loseOut.textContent = loseCnt;
        remainOut.textContent = remain;
        guessOut.textContent = guesses;
    }

    function winGame(){
        alert("YOU WIN!!! \n The letter was: " + answer.toUpperCase());
        winCnt++;
        startGame();
    }

    function wrongAnswer(ltr){
        remain--;
        if(remain > 0){
            guesses.push(ltr.toUpperCase());
            display();
        } else{
            alert("Sorry, you lost.  Please try again.");
            loseCnt++;
            startGame();
        }
    }

}
// Instantiate PsychicGame
/* optional guess count change */
var myGame = new PsychicGame({
    NumGuesses: 10
});
myGame.play();

document.addEventListener('keypress', (event) => {
    myGame.guess(event.key);

});
