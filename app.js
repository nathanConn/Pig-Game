/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, scorePrompt;

reset();

var lastDice, lastDice2;

document.querySelector('.btn-roll').addEventListener('click', function btn() {
        if (gamePlaying){

        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';
            
        var diceDom2 = document.querySelector('.dice2');
        diceDom2.style.display = 'block';
        diceDom2.src = 'dice-' + dice2 + '.png';
        //Player loses total score if they roll a six twice in a row   
        if ((dice === 6 && lastDice === 6) || (dice2 === 6 && lastDice2 === 6)) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        //player loses round score if they roll a 1    
        } else if (dice !== 1 || dice2 !==1) {
            //add scoe
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
        } else {
            //next player
            nextPlayer();

        } 
        
        lastDice = dice;
        lastDice2 = dice2;
    }
     
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if (scores[activePlayer] >= scorePrompt) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            //alert('Player ' + (activePlayer + 1) + ' wins!');
            //disable game continuation?
        } else {
            //nextplayer
        nextPlayer();
        }
    }
    
})

document.querySelector('.btn-new').addEventListener('click', reset);

function reset () {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    
    scorePrompt = prompt("What are you playing to?");

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent ='0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2'; 
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}