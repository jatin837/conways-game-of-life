import { Generation } from "./algo"
const canvas  = document.getElementById("screen") as HTMLCanvasElement;
const ctx : CanvasRenderingContext2D= canvas.getContext('2d')

const toPx = (x: number) => x*blockSize

const x_blocks = 105
const y_blocks = 65

canvas.height = toPx(y_blocks)
canvas.width = toPx(x_blocks)


let gen: Generation = new Generation(x_blocks, y_blocks)
const blockSize = 10

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height);

function drawBoard(m:number, n:number){
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

function drawCell(x:number, y:number, color:string){  
  ctx.fillStyle = color
  ctx.fillRect(toPx(x), toPx(y), blockSize, blockSize)
}
drawBoard(x_blocks, y_blocks)

gen.setInitialState(
  [
    [2, 2],
    [5, 6],
    [47, 45],
    [48, 56],
    [32, 12]
  ]
)

while (true){
  gen.setNextState()
  for(let i: number = 10; i < gen.x; i++){
    for (let j: number = 10; j < gen.y; j++){
      if (gen.member[i][j].current === 1){
        drawCell(i, j, "red")
      }else{
        drawCell(i, j, "black")
      }
    }
  }
  gen.evolve()
  console.log(gen)

}