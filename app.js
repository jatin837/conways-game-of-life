const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d')

const x_blocks = 105
const y_blocks = 65

const blockSize = 10

const toPx = x => x*blockSize

canvas.height = toPx(y_blocks)
canvas.width = toPx(x_blocks)

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height);

function drawBoard(m, n){
  ctx.strokeStyle = 'white'
  for (var i = 1; i < m; i++){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(toPx(i), toPx(0));
    ctx.lineTo(toPx(i), toPx(n+1));
    ctx.stroke() 
  }
  for (var i = 1; i < n; i++){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(toPx(0), toPx(i));
    ctx.lineTo(toPx(m+1), toPx(i));
    ctx.stroke() 
  }
  for (var i = 0; i < m; i++){
    ctx.fillStyle = 'black'
    ctx.fillRect(toPx(i), toPx(0), blockSize, blockSize)
  }
  for (var i = 0; i < m; i++){
    ctx.fillStyle = 'black'
    ctx.fillRect(toPx(i), toPx(n - 1), blockSize, blockSize)
  }
  for (var i = 0; i < n; i++){
    ctx.fillStyle = 'black'
    ctx.fillRect(toPx(0), toPx(i), blockSize, blockSize)
  }
  for (var i = 0; i < n; i++){
    ctx.fillStyle = 'black'
    ctx.fillRect(toPx(m - 1), toPx(i), blockSize, blockSize)
  }
}

function drawCell(x, y){  
  ctx.fillStyle = 'red'
  ctx.fillRect(toPx(x), toPx(y), blockSize, blockSize)
}
drawBoard(x_blocks, y_blocks, blockSize)