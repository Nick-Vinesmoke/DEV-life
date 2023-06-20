/*
██████╗░███████╗██╗░░░██╗░░░░░░██╗░░░░░██╗███████╗███████╗
██╔══██╗██╔════╝██║░░░██║░░░░░░██║░░░░░██║██╔════╝██╔════╝
██║░░██║█████╗░░╚██╗░██╔╝█████╗██║░░░░░██║█████╗░░█████╗░░
██║░░██║██╔══╝░░░╚████╔╝░╚════╝██║░░░░░██║██╔══╝░░██╔══╝░░
██████╔╝███████╗░░╚██╔╝░░░░░░░░███████╗██║██║░░░░░███████╗
╚═════╝░╚══════╝░░░╚═╝░░░░░░░░░╚══════╝╚═╝╚═╝░░░░░╚══════╝
by: https://github.com/Nick-Vinesmoke
*/

'use strict';

function Character(username, callbackPlay, callbackBack) {
    var self = this;

    self.username = username;
    self.letsPlay = false;
    self.cbPlay = callbackPlay;
    self.cbBack = callbackBack;
    self.characterSelectedImage;
}

Character.prototype.display = function () {
    var self = this;

    self.characterMain = buildDom(`
        <main class="characters-screen container">
            <h1>Choose a Dev</h1>
            <div class="characters-icons">
                <div>
                    <img src="./images/barbara.png" alt="character1" class="player1" song="barbara.mp3">
                </div>
                <div>
                    <img src="./images/diana.png" alt="character2" class="player2" song="diana.mp3">
                </div>
                <div>
                    <img src="./images/caroline.png" alt="character3" class="player3" song="caroline.mp3">
                </div>
                <div>
                    <img src="./images/axel.png" alt="character4" class="player4" song="axel.mp3">
                </div>
                <div>
                    <img src="./images/gabriela.png" alt="character5" class="player5" song="gabriela.mp3">
                </div>
                <div>
                    <img src="./images/francesca.png" alt="character6" class="player6" song="francesca.mp3">
                </div>
                <div>
                    <img src="./images/yenderly.png" alt="character7" class="player7" song="yenderly.mp3">
                </div>
                <div>
                    <img src="./images/jonathan.png" alt="character8" class="player8" song="jonathan.mp3">
                </div>
                <div>
                    <img src="./images/mariaj.png" alt="character9" class="player9" song="mariaj.mp3">
                </div>
                <div>
                    <img src="./images/filipe.png" alt="character10" class="player10" song="filipe.mp3">
                </div>
                <div>
                    <img src="./images/rapha.png" alt="character11" class="player11" song="rapha.mp3">
                </div>
                <div>
                    <img src="./images/andre.png" alt="character12" class="player12" song="andre.mp3">
                </div>
                <div>
                    <img src="./images/seba.png" alt="character12" class="player13" song="seba.mp3">
                </div>
            </div>
            <div class="go-game">
                <div>
                    <button class="button-back">Back</button>
                </div>
                <div>
                    <button class="button-play">Play</button>
                </div>
            </div>
        </main>
    `);

    document.body.appendChild(self.characterMain);

    var buttonBack = self.characterMain.querySelector('.button-back');
    buttonBack.addEventListener('click', self.cbBack);

    var buttonPlay = self.characterMain.querySelector('.button-play');
    buttonPlay.addEventListener('click', self.cbPlay);

    self.characters = self.characterMain.querySelector('.characters-icons');
    self.characters.addEventListener('click', function(event) {
            var selectedIcon =  self.characters.querySelector('.selected');
            if (selectedIcon) {
                selectedIcon.classList.remove('selected');
            }
            event.target.classList.toggle('selected');
            self.characterSelectedElement = event.target;
            self.img = event.target.src;
            self.song = event.target.getAttribute('song');
    });

    

    
    
}



Character.prototype.toPlay = function (callback, characterSelectedImage) {
    var self = this;

    self.onCharacterCallback = callback;
};

Character.prototype.toBack = function (callback) {
    var self = this;

    self.onCharacterCallback = callback;
};


Character.prototype.destroy = function () {
    var self = this;

    self.characterMain.remove();
};