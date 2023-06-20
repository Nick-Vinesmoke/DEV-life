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

function Game(username, characterScreen) {
    var self = this;

    self.gameIsOver = false;
    self.username = username;
    self.score = 0;
    self.isPause = false;


    self.level = 1;
    self.intervalId = 0;
    self.rateEnemies;
    self.ratePoints;
    self.rateLives;
    self.speedEnemies;
    self.speedPoints;
    self.speedLives;
    self.message = '';


    self.highScore = 0;
    self.characterScreen = characterScreen;

}

Game.prototype.start = function () {
    var self = this;

    self.gameMain = buildDom(`
        <main class="game">
            <header>
                <div class="lives">
                    <span class="label">Lives :</span>
                    <span class="value"></span>
                </div>
                <div class='username'>
                    <p></p>
                </div>
                <div class="score">
                    <span class="label">Score :</span>
                    <span class="value"></span>
                </div>
            </header>
            <div class="canvas">
                <canvas></canvas>
            </div>
            <div class="buttons-mobile">
                <div>
                    <button class="left">Left</button>
                </div>
                <div>
                    <button class="right">Right</button>
                </div>
            </div>
            <audio class="soundtrack"><source type="audio/mpeg" /></audio>     
        </main>
    `);

    document.body.appendChild(self.gameMain);

    self.canvasParentElement = self.gameMain.querySelector('.canvas');
    self.canvasElement = self.canvasParentElement.querySelector('canvas');

    self.usernameElement = self.gameMain.querySelector('.username p');
    self.usernameElement.innerText = self.username;

    self.livesElement = self.gameMain.querySelector('.lives .value');
    self.scoreElement = self.gameMain.querySelector('.score .value');

    self.audioElement = self.gameMain.querySelector('.soundtrack');
    if(self.characterScreen.song) {
        self.audioElement.src = './music/' + self.characterScreen.song;
    } else {
        self.audioElement.src = './music/diva.mp3';
    }

    self.pointsSound = new Audio("./music/collision-point.mp3");
    self.enemiesSound = new Audio("./music/collision-enemies.mp3");
    
    

    self.width = self.canvasParentElement.offsetWidth;
    self.height = self.canvasParentElement.offsetHeight;

    


    self.canvasElement.setAttribute('width', self.width);
    self.canvasElement.setAttribute('height', self.height);

    self.player = new Player(self.canvasElement, 5, self.characterScreen.img);

    self.handleKeyDown = function(event) {
        if (event.key === 'ArrowLeft' || event.target.classList.contains('left')) {
          self.player.setDirection(-1);
        } else if (event.key === 'ArrowRight' || event.target.classList.contains('right')) {
          self.player.setDirection(1);
        }
    }

    self.leftTouchButton = self.gameMain.querySelector('.left');
    self.rightTouchButton = self.gameMain.querySelector('.right');
    self.leftTouchButton.addEventListener('click', self.handleKeyDown);
    self.rightTouchButton.addEventListener('click', self.handleKeyDown);

    

    document.body.addEventListener('keydown', self.handleKeyDown)

    self.starLoop();

    self.enemies = [];
    self.points = [];
    self.lives = [];

    function roundTime () {
        self.level++;
        self.message = new Message (self.canvasElement, 'Level ' + self.level);
        

        setTimeout(function() {
            self.message = null;
        }, 2000)

        if (self.level >= 5) {
            clearInterval(self.intervalId);
        }
        
    }
    self.intervalId = setInterval(roundTime, 15000);
};

Game.prototype.starLoop = function () {
    var self = this;

    self.ctx = self.canvasElement.getContext('2d');
    
    document.body.addEventListener('keyup', function(event) {
        if(event.key === ' ') {
            self.isPause = !self.isPause;
            if(!self.isPause) {
                loop();
                self.audioElement.play();
            }
        }
    });

    self.audioElement.play();

    function loop () {
        
        self.checkRound();

        // create more enemies now and then
        if (Math.random() > self.rateEnemies) {
            var x = self.canvasElement.width * Math.random();
            self.enemies.push(new Enemy(self.canvasElement, x, self.speedEnemies));
        }
        
        // create more points now and then
        if (Math.random() > self.ratePoints) {
            var x = self.canvasElement.width * Math.random();
            self.points.push(new Point(self.canvasElement, x, self.speedPoints));
        }
        
        // create more lives now and then
        if (Math.random() > self.rateLives) {
            var x = self.canvasElement.width * Math.random();
            self.lives.push(new Live(self.canvasElement, x, self.speedLives));
        }

        //update positions
        self.player.update();

        self.enemies.forEach(function(item) {
            item.update();
        });

        self.points.forEach(function(item) {
            item.update();
        });

        self.lives.forEach(function(item) {
            item.update();
        });

        //check positions
        self.enemies = self.enemies.filter(function(item) {
        return item.isInScreen();
        });

        self.points = self.points.filter(function(item) {
            return item.isInScreen();
        });

        self.lives = self.lives.filter(function(item) {
            return item.isInScreen();
          });
        
        

        // check if player collide with enemy
        self.checkIfEnemiesCollidedPlayer();
        self.checkIfPointsCollidedPlayer();
        self.checkIfLivesCollidedPlayer();

        // - loose life or win points
        self.livesElement.innerText = self.player.lives;
        self.scoreElement.innerText = self.score;

        //erase canvas
        self.ctx.clearRect(0, 0, self.width, self.height);

        

        //draw
        if (self.message) {
            self.message.draw();
        }

        self.player.draw();


        self.enemies.forEach(function(item) {
            item.draw();
        });

        self.points.forEach(function(item) {
            item.draw();
        });

        self.lives.forEach(function(item) {
            item.draw();
        });

        // if game is not over
        if(!self.gameIsOver && !self.isPause) {
            window.requestAnimationFrame(loop);
          } else {
            self.audioElement.pause();
          }
    }


    window.requestAnimationFrame(loop);
};

// Game.prototype.getHighScore = function (score) {
//     var self = this;
    
//     self.highScore = localStorage.getItem(score)
// };

// Game.prototype.compareHighScore = function () {
//     if (self.player.score > self.highScore) {
//         localStorage.setItem('self.highScore', 'self.player.score');
//     }
// }

Game.prototype.checkRound = function() {
    var self = this;
    
    if(self.level === 1) {
        self.rateEnemies = 0.96;
        self.ratePoints = 0.985;
        self.rateLives = 0.994;

        self.speedEnemies = 5;
        self.speedPoints = 6;
        self.speedLives = 8;
    } else if (self.level === 2) {
        self.rateEnemies = 0.95;
        self.ratePoints = 0.985;
        self.rateLives = 0.995;

        self.speedEnemies = 6;
        self.speedPoints = 7;
        self.speedLives = 9;
    } else if (self.level === 3) {
        self.rateEnemies = 0.94;
        self.ratePoints = 0.985;
        self.rateLives = 0.996;

        self.speedEnemies = 8;
        self.speedPoints = 8;
        self.speedLives = 10;
    } else if (self.level === 4) {
        self.rateEnemies = 0.9;
        self.ratePoints = 0.98;
        self.rateLives = 0.997;

        self.speedEnemies = 8;
        self.speedPoints = 9;
        self.speedLives = 12;
    }   else if (self.level === 5) {
        self.rateEnemies = 0.80;
        self.ratePoints = 0.98;
        self.rateLives = 0.993;

        self.speedEnemies = 10;
        self.speedPoints = 11;
        self.speedLives = 12;
    }
};

Game.prototype.checkIfEnemiesCollidedPlayer = function() {
    var self = this;

    self.enemies.forEach(function (item, index) {
        if (self.player.collidesWithEnemy(item)) {
            self.player.collided();
            self.enemies.splice(index,1);
            self.enemiesSound.play();
            self.enemiesSound.volume = 0.7;

            if (!self.player.lives) {
                self.gameOver();
            }
        }
    });
};

Game.prototype.checkIfPointsCollidedPlayer = function () {
    var self = this;
  
    self.points.forEach(function (item, index) {
      if (self.player.collidesWithEnemy(item)) {
        self.points.splice(index, 1);
        self.pointsSound.play();
        self.pointsSound.volume = 0.7;

        if (self.level === 1) {
            self.score++;
        } else {
            self.score +=2;
        }
      };
    });
};

Game.prototype.checkIfLivesCollidedPlayer = function () {
    var self = this;
  
    self.lives.forEach(function (item, index) {
      if (self.player.collidesWithLives(item)) {
        self.player.collidedLive(item);
        self.lives.splice(index, 1);
        self.pointsSound.play();
        self.pointsSound.volume = 0.7;
      };
    });
  };

Game.prototype.onOver = function (callback) {
    var self = this;

    self.onGameOverCallback = callback;
};

Game.prototype.gameOver = function () {
    var self = this;

    self.gameIsOver = true;
    self.onGameOverCallback();
};

Game.prototype.destroy = function () {
    var self = this;

    self.gameMain.remove();
};