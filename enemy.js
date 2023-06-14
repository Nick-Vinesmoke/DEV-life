/*
DEV_life
by: https://github.com/Nick-Vinesmoke
*/

'use strict';

function Enemy (canvas, x, speed) {
    var self = this;

    self.canvasElement = canvas;
    self.size = 35;
    self.y = 0 - self.size;
    self.x = x;
    self.speed = speed;
    self.enemyImage = new Image();
    self.enemiesChoices = ["./images/undifined.png","./images/unexpected.png","./images/error.png"];
    self.enemyImage.src = self.getRandomImage();
    self.ctx = self.canvasElement.getContext('2d');
}

Enemy.prototype.getRandomImage = function () {
    var self = this;

    var randomNum = Math.floor(Math.random() * self.enemiesChoices.length);
    return self.enemiesChoices[randomNum];
    
};


Enemy.prototype.update = function () {
    var self = this;

    self.y = self.y + self.speed;
};

Enemy.prototype.draw = function () {
    var self = this;

    self.ctx.fillStyle = '#E3514C';

    self.xPosition = self.x - (self.size/2);
    self.yPosition = self.y - (self.size/2);
    self.ctx.drawImage(self.enemyImage, self.xPosition, self.yPosition, self.size, self.size);

};

Enemy.prototype.isInScreen = function () {
    var self = this;
    //  if x is smaller than 0 remove from the arry
    return self.canvasElement.height + self.size / 2 > 0;
};

