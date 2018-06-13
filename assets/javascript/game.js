
//
var PsychicGame = function (options) {

    var winCnt = 0;
    var loseCnt = 0;
    var remain = 0;
    var guesses = [];
    var answer = "";

    var jumbo = document.getElementById('jumbo-default');
    var specialJumbo;

    var winOut = document.getElementById('winOut');
    var loseOut = document.getElementById('lossOut');
    var remainOut = document.getElementById('remainOut');
    var guessOut = document.getElementById('guessOut');

    var btns = document.querySelectorAll('.btn');

    this.play = function () {
        for(var i=0; i<btns.length; i++){
            btns[i].addEventListener("click", startGame);
        }
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
        if(specialJumbo) specialJumbo.classList.add('d-none');
        jumbo.classList.remove('d-none');
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

    function winGame() {
        jumbo.classList.add('d-none');
        specialJumbo = document.getElementById('jumbo-win');
        document.getElementById('winLtr').textContent = answer.toUpperCase();
        specialJumbo.classList.remove('d-none');
        winCnt++;
        display();
        // startGame();
    }

    function wrongAnswer(ltr) {
        remain--;
        if (remain > 0) {
            guesses.push(ltr.toUpperCase());
            display();
        } else if(remain === 0) {
            jumbo.classList.add('d-none');
            specialJumbo = document.getElementById('jumbo-lose');
            specialJumbo.classList.remove('d-none');
            loseCnt++;
            display();
            // startGame();
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
