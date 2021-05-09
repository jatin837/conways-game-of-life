const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d')
x_blocks = 9
y_blocks = 8
const blockSize = 20

canvas.height = blockSize*y_blocks
canvas.width = blockSize*x_blocks

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height);


function drawBoard(m, n, blockSize){
  for (var i = 1; i < m; i++){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(i*blockSize, 0);
    ctx.lineTo(i*blockSize, (n+1)*blockSize);
    ctx.stroke() 
  }
  for (var i = 1; i < n; i++){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(0, i*blockSize);
    ctx.lineTo((m+1)*blockSize, i*blockSize);
    ctx.stroke() 
  }
}

drawBoard(x_blocks, y_blocks, blockSize)