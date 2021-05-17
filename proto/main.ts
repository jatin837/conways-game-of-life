let canvas = document.getElementById("screen") as HTMLCanvasElement;
let ctx : CanvasRenderingContext2D = canvas.getContext('2d');

let blockSize = 9;
let toPx = function (x: number) { return x * blockSize; };
let x_blocks : number = 110;
let y_blocks : number = 70;
let border : number = 1;
canvas.height = toPx(y_blocks);
canvas.width = toPx(x_blocks);

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function drawBoard(m: number, n: number) {
    ctx.strokeStyle = 'white';
    for (let i = 1; i < m; i++) {
        ctx.beginPath();
        ctx.lineWidth = border;
        ctx.moveTo(toPx(i), toPx(0));
        ctx.lineTo(toPx(i), toPx(n + 1));
        ctx.stroke();
    }
    for (let i = 1; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(toPx(0), toPx(i));
        ctx.lineTo(toPx(m + 1), toPx(i));
        ctx.stroke();
    }
    for (let i = 0; i < m; i++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(toPx(i), toPx(0), blockSize, blockSize);
    }
    for (let i = 0; i < m; i++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(toPx(i), toPx(n - 1), blockSize, blockSize);
    }
    for (let i = 0; i < n; i++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(toPx(0), toPx(i), blockSize, blockSize);
    }
    for (let i = 0; i < n; i++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(toPx(m - 1), toPx(i), blockSize, blockSize);
    }
}
function drawCell(x: number, y: number, color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(toPx(x)+border, toPx(y) + border, blockSize - 2*border, blockSize- 2*border)
}
drawBoard(x_blocks, y_blocks);

let gen = new Array(x_blocks)

for (let i = 0; i < x_blocks; i++) {
    gen[i] = new Array(y_blocks)
    for (let j = 0; j < y_blocks; j++) {
        gen[i][j] = [0, 0]
    }
}

function setNextState() {
    for (let i = 1; i < x_blocks - 1; i++) {
        for (let j = 1; j < y_blocks - 1; j++) {
            gen[i][j][1] = getNextState(i, j);
        }
    }
}

function getNextState(i: number, j: number) {
    let neighbourhood = new Array(gen[i - 1][j][0],
        gen[i + 1][j][0],
        gen[i][j - 1][0],
        gen[i][j + 1][0],
        gen[i - 1][j - 1][0],
        gen[i - 1][j + 1][0],
        gen[i + 1][j - 1][0],
        gen[i + 1][j + 1][0]
    );
    let count : number = 0
    for (let k = 0; k < 8; k++) {
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

function setInitialState(initStates: number[][]) {
    for (let i = 0; i < initStates.length; i++) {
        setState(initStates[i][0], initStates[i][1], 1);
    }
}

function evolve() {
    for (let i = 0; i < x_blocks; i++) {
        for (let j = 0; j < y_blocks; j++) {
            gen[i][j][0] = gen[i][j][1];
        }
    }
}

function setState(i: number, j: number, val: number) {
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
    console.log(gen[2][3])
    for (let i = 1; i < x_blocks - 1; i++) {
        for (let j = 1; j < y_blocks - 1; j++) {
            if (gen[i][j][0] == 1) {
                drawCell(i, j, 'white')
            }
            else {
                drawCell(i, j, 'black')
            }
        }
    }

    setNextState()
    evolve()
}

setInterval(main, 100)
