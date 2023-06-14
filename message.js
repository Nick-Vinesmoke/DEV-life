/*
DEV_life
by: https://github.com/Nick-Vinesmoke
*/

function Message (canvas, text) {
    var self = this;

    self.canvasElement = canvas;
    self.ctx = self.canvasElement.getContext('2d');
    self.x = self.canvasElement.width / 2 - 210;
    self.y = self.canvasElement.height / 2 + 30;
    self.text = text;
}

Message.prototype.draw = function () {
    var self = this;
    self.ctx.font = "150px VT323"
    self.ctx.fillStyle = "#222"
    self.ctx.fillText(self.text, self.x, self.y);
}