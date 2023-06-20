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

function Point (canvas, x, speed) {
    var self = this;

    self.canvasElement = canvas;
    self.size = 35;
    self.y = 0 - self.size;
    self.x = x;
    self.speed = speed;
    self.pointImage = new Image();
    self.pointsChoices = ["./images/beer.png","./images/coffe.png","./images/pingpong.png"];
    self.pointImage.src = self.getRandomImage();
    self.ctx = self.canvasElement.getContext('2d');
}

Point.prototype.getRandomImage = function () {
    var self = this;

    var randomNum = Math.floor(Math.random() * self.pointsChoices.length);
    return self.pointsChoices[randomNum];
    
};

Point.prototype.update = function () {
    var self = this;

    self.y = self.y + self.speed;
};

Point.prototype.draw = function () {
    var self = this;

    self.ctx.fillStyle = '#299B41';

    self.xPosition = self.x - (self.size/2);
    self.yPosition = self.y - (self.size/2);
    self.ctx.drawImage(self.pointImage, self.xPosition, self.yPosition, self.size, self.size);

};

Point.prototype.isInScreen = function () {
    var self = this;
    //  if x is smaller than 0 remove from the arry
    return self.canvasElement.height + self.size / 2 > 0;
};

