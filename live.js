/*
DEV_life
by: https://github.com/Nick-Vinesmoke
*/

'use strict';

function Live (canvas, x, speed) {
    var self = this;

    self.canvasElement = canvas;
    self.size = 35;
    self.y = 0 - self.size;
    self.x = x;
    self.speed = speed;
    self.liveImage = new Image();
    self.livesChoices = ["./images/rapha.png","./images/filipe.png","./images/andre.png", "./images/seba.png"];
    self.liveImage.src = self.getRandomImage();
    self.ctx = self.canvasElement.getContext('2d');
}

Live.prototype.getRandomImage = function () {
    var self = this;

    var randomNum = Math.floor(Math.random() * self.livesChoices.length);
    return self.livesChoices[randomNum];
    
};

Live.prototype.update = function () {
    var self = this;

    self.y = self.y + self.speed;
};

Live.prototype.draw = function () {
    var self = this;

    self.ctx.fillStyle = '#E69B0C';
    self.xPosition = self.x - (self.size/2);
    self.yPosition = self.y - (self.size/2);
    self.ctx.drawImage(self.liveImage, self.xPosition, self.yPosition, self.size, self.size);
};

Live.prototype.isInScreen = function () {
    var self = this;
    //  if x is smaller than 0 remove from the arry
    return self.x + self.size / 2 > 0;
}