"use strict";
exports.__esModule = true;
var algo_1 = require("./algo");
var canvas = document.getElementById("screen");
var ctx = canvas.getContext('2d');
var toPx = function (x) { return x * blockSize; };
var x_blocks = 105;
var y_blocks = 65;
canvas.height = toPx(y_blocks);
canvas.width = toPx(x_blocks);
var gen = new algo_1.Generation(x_blocks, y_blocks);
var blockSize = 10;
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
function drawBoard(m, n) {
    ctx.strokeStyle = 'white';
    for (var i = 1; i < m; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(toPx(i), toPx(0));
        ctx.lineTo(toPx(i), toPx(n + 1));
        ctx.stroke();
    }
    for (var i = 1; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(toPx(0), toPx(i));
        ctx.lineTo(toPx(m + 1), toPx(i));
        ctx.stroke();
    }
    for (var i = 0; i < m; i++) {
        ctx.fillStyle = 'black';
        ctx.fillRect(toPx(i), toPx(0), blockSize, blockSize);
    }
    for (var i = 0; i < m; i++) {
        ctx.fillStyle = 'black';
        ctx.fillRect(toPx(i), toPx(n - 1), blockSize, blockSize);
    }
    for (var i = 0; i < n; i++) {
        ctx.fillStyle = 'black';
        ctx.fillRect(toPx(0), toPx(i), blockSize, blockSize);
    }
    for (var i = 0; i < n; i++) {
        ctx.fillStyle = 'black';
        ctx.fillRect(toPx(m - 1), toPx(i), blockSize, blockSize);
    }
}
function drawCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(toPx(x), toPx(y), blockSize, blockSize);
}
drawBoard(x_blocks, y_blocks);
gen.setInitialState([
    [2, 2],
    [5, 6],
    [47, 45],
    [48, 56],
    [32, 12]
]);
while (true) {
    gen.setNextState();
    for (var i = 10; i < gen.x; i++) {
        for (var j = 10; j < gen.y; j++) {
            if (gen.member[i][j].current === 1) {
                drawCell(i, j, "red");
            }
            else {
                drawCell(i, j, "black");
            }
        }
    }
    gen.evolve();
}
