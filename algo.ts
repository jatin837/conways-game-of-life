export class State {
  current: number;
  next: number;
  constructor(){
    this.current = 0;
    this.next = 0;
  }
}

export class Generation {
  x: number
  y: number
  member: State[][]
  constructor(x:number, y:number){
    this.x = x
    this.y = y
    this.member = new Array(this.x)
    this.addMembers()
  }
  
  addMembers(){
    for (let i = 0; i < this.x; i++){
      this.member[i] = new Array()
      for (var j = 0; j < this.y; j++){
        this.member[i][j] = new State()
      }
    }
  }

  setNextState(){
    for (var i = 1; i < this.x - 1; i++){
      for (var j = 1; j < this.y - 1; j++){
        this.member[i][j].next = this.getNextState(i, j)
      }
    }
  }
  
  setState(i:number, j:number, val:number){
    this.member[i][j].current = val
  }

  getNextState(i:number, j:number){
    var neighbourhood = new Array(
      this.member[i-1][j].current, 
      this.member[i+1][j].current, 
      this.member[i][j-1].current, 
      this.member[i][j+1].current, 
      this.member[i-1][j-1].current, 
      this.member[i-1][j+1].current, 
      this.member[i+1][j-1].current, 
      this.member[i+1][j+1].current 
    )

    let count: number = 0
    let alive:boolean
    if (this.member[i][j].current === 1){
      alive = true
    }else {
      alive = false
    }
    for (var k = 0; k < 8; k++){
      if (neighbourhood[k] === 1) {
        count ++
      }
    }
    if (alive){
      if (count < 2 || count > 3){
        return 0
      }
    }else {
      if (count === 3){
        return 1
      }
    }
  }
  evolve(){
    for (let i : number = 0; i < this.x; i++){
      for (let j : number = 0; j < this.y; j++){
        this.member[i][j].current = this.member[i][j].next
      }
    }
  }

  setInitialState(initStates: number[][]){
    for (var i = 0; i < initStates.length; i++){
      this.setState(initStates[i][0], initStates[i][1], 1)
    }
  }
}

