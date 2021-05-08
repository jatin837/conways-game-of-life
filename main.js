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
    for (var i = 1; i < this.size - 1; i++){
      for (var j = 1; j < this.size - 1; j++){
        this.member[i][j].next = this.getNextState(i, j)
      }
    }
  }
  
  setState(i, j, val){
    this.member[i][j].current = val
  }

  getNextState(i, j){
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

    let count = 0
    let alive
    if (this.member[i][j] === 1){
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
      if (count < 2){
        return 0
      }
      else if (count < 4){
        return 1
      }
      else {
        return 0
      }
    }else {
      if (count === 3){
        return 1
      }else {
        return 0
      }
    }
  }
  render(){
    var context = ""
    for (var i = 0; i < this.size; i++){
      for (var j = 0; j < this.size; j++){
        if (i === 0 || i === this.size - 1 || j === 0 || j === this.size - 1 ){
          context += '#'
        }
        else if (this.member[i][j] === 1){
          context += '@'
        }else {
          context += ' '
        }
      }
      context += '\n'
    }
    console.log(context)
  }
}

gen = new Generation(50)
gen.setState(3, 4, 1)
gen.setState(4, 4, 1)
gen.setState(3, 3, 1)
gen.setState(3, 5, 1)
setInterval(main, 10000)
function main(){
  console.clear()
  gen.render()
  gen.setNextState()
}
