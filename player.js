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

function Player (canvas, lives, image) {
    var self = this;

    self.canvasElement = canvas;
    self.x = self.canvasElement.width / 2;
    self.y = self.canvasElement.height - 30;
    self.direction = 0;
    self.size = 50;
    self.speed = 5;
    self.lives = lives;
    self.ctx = self.canvasElement.getContext('2d');
    self.character = new Image();
    self.character.src = image|| './images/diva.png';
}

Player.prototype.setDirection = function(direction) {
    var self = this;

    self.direction = direction;
};

Player.prototype.collidesWithEnemy = function (enemy) {
    var self = this;
    
    const collidesRight = self.x + self.size / 2 > enemy.x - enemy.size / 2;
    const collidesLeft = self.x - self.size / 2 < enemy.x + enemy.size / 2;
    const collidesTop = self.y - self.size / 2 < enemy.y + enemy.size / 2;
    const collidesBottom = self.y + self.size / 2 > enemy.y - enemy.size / 2;

    if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
        return true;
    }
    
    return false;
};

Player.prototype.collided = function (enemy) {
    var self = this;
    
    self.lives--;
};

Player.prototype.collidesWithLives = function (enemy) {
    var self = this;
    
    const collidesRight = self.x + self.size / 2 > enemy.x - enemy.size / 2;
    const collidesLeft = self.x - self.size / 2 < enemy.x + enemy.size / 2;
    const collidesTop = self.y - self.size / 2 < enemy.y + enemy.size / 2;
    const collidesBottom = self.y + self.size / 2 > enemy.y - enemy.size / 2;

    if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
        return true;
    }
    
    return false;
};

Player.prototype.collidedLive = function (item) {
    var self = this;
    if (item.liveImage.src.includes('andre')) {
        self.lives += 2;
    } else {
        self.lives++;
    }
};

Player.prototype.update = function() {
    var self = this;

    self.x = self.x + self.direction * self.speed;

    if (self.x <0) {
        self.direction = 1;
    }

    if (self.x > self.canvasElement.width) {
        self.direction = -1;
    }
};

Player.prototype.draw = function() {
    var self = this;

    
    // center the center
    self.xPosition = self.x - (self.size/2);
    self.yPosition = self.y - (self.size/2);
    self.ctx.drawImage(self.character, self.xPosition, self.yPosition, self.size, self.size);
    // self.ctx.fillRect(self.xPosition, self.yPosition, self.size, self.size);
};