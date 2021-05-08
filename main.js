class State {
  constructor(){
    this.current = 0;
    this.next = 0;
  }
}

class Generation {
  constructor(size){
    this.size = size
    this.member = new Array(this.size)
    this.addMembers()
  }
  
  addMembers(){
    for (var i = 0; i < this.size; i++){
      this.member[i] = new Array()
      for (var j = 0; j < this.size; j++){
        this.member[i][j] = new State()
      }
    }
  }

  setNextState(){
    for (var i = 0; i < this.size; i++){
      for (var j = 0; j < this.size; j++){
        this.member[i][j].next = this.getNextState(i, j)
      }
    }
  }
  getNextState(i, j){
    if (i === 0 || j === 0 || i === this.size - 1 || j === this.size - 1){
      return 0
    }
    else{
      let left      = this.member[i-1][j].current 
      let right     = this.member[i+1][j].current 
      let up        = this.member[i][j-1].current 
      let down      = this.member[i][j+1].current 
      let leftUp    = this.member[i-1][j-1].current 
      let leftDown  = this.member[i-1][j+1].current 
      let rightUp   = this.member[i+1][j-1].current 
      let rightDown = this.member[i+1][j+1].current 

      if (left == right){
        return 1
      }
      else {
        return 0
      }
    }
  }
}

gen = new Generation(10)
console.log(gen)

console.log(gen.member[1][1].current)
gen.setNextState()
console.log(gen.member[1][1].next)
