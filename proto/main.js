var canvas = document.getElementById("screen");
var ctx = canvas.getContext('2d');
var blockSize = 9;
var toPx = function (x) { return x * blockSize; };
var x_blocks = 110;
var y_blocks = 70;
var border = 1;
canvas.height = toPx(y_blocks);
canvas.width = toPx(x_blocks);
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
function drawBoard(m, n) {
    ctx.strokeStyle = 'white';
    for (var i = 1; i < m; i++) {
        ctx.beginPath();
        ctx.lineWidth = border;
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
        ctx.fillStyle = 'white';
        ctx.fillRect(toPx(i), toPx(0), blockSize, blockSize);
    }
    for (var i = 0; i < m; i++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(toPx(i), toPx(n - 1), blockSize, blockSize);
    }
    for (var i = 0; i < n; i++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(toPx(0), toPx(i), blockSize, blockSize);
    }
    for (var i = 0; i < n; i++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(toPx(m - 1), toPx(i), blockSize, blockSize);
    }
}
function drawCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(toPx(x) + border, toPx(y) + border, blockSize - 2 * border, blockSize - 2 * border);
}
drawBoard(x_blocks, y_blocks);
var gen = new Array(x_blocks);
for (var i = 0; i < x_blocks; i++) {
    gen[i] = new Array(y_blocks);
    for (var j = 0; j < y_blocks; j++) {
        gen[i][j] = [0, 0];
    }
}
function setNextState() {
    for (var i = 1; i < x_blocks - 1; i++) {
        for (var j = 1; j < y_blocks - 1; j++) {
            gen[i][j][1] = getNextState(i, j);
        }
    }
}
function getNextState(i, j) {
    var neighbourhood = new Array(gen[i - 1][j][0], gen[i + 1][j][0], gen[i][j - 1][0], gen[i][j + 1][0], gen[i - 1][j - 1][0], gen[i - 1][j + 1][0], gen[i + 1][j - 1][0], gen[i + 1][j + 1][0]);
    var count = 0;
    for (var k = 0; k < 8; k++) {
        if (neighbourhood[k] === 1) {
            count++;
        }
    }
    if (gen[i][j][0] === 1) {
        if (count < 2 || count > 3) {
            return 0;
        }
        else {
            return 1;
        }
    }
    else {
        if (count === 3) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
function setInitialState(initStates) {
    for (var i = 0; i < initStates.length; i++) {
        setState(initStates[i][0], initStates[i][1], 1);
    }
}
function evolve() {
    for (var i = 0; i < x_blocks; i++) {
        for (var j = 0; j < y_blocks; j++) {
            gen[i][j][0] = gen[i][j][1];
        }
    }
}
function setState(i, j, val) {
    gen[i][j][0] = val;
}
setInitialState([
    [28, 28],
    [30, 29],
    [27, 30],
    [28, 30],
    [31, 30],
    [32, 30],
    [33, 30]
]);
function main() {
    console.log(gen[2][3]);
    for (var i = 1; i < x_blocks - 1; i++) {
        for (var j = 1; j < y_blocks - 1; j++) {
            if (gen[i][j][0] == 1) {
                drawCell(i, j, 'white');
            }
            else {
                drawCell(i, j, 'black');
            }
        }
    }
    setNextState();
    evolve();
}
setInterval(main, 100);
