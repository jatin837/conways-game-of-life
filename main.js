class State {
  constructor(){
    this.current = 0;
    this.next = 0;
  }
}

class Generation {
  constructor(x, y){
    this.x = x
    this.y = y
    this.member = new Array(this.x)
    this.addMembers()
  }
  
  addMembers(){
    for (var i = 0; i < this.x; i++){
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
    while (true){
      console.log('running')
      this.setNextState()
      for (var i = 0; i < this.x; i ++){
        for (var j = 0; j < this.y; j ++){
          this.setState(i, j, this.member[i][j].next)
        }
      }
    }
  }

  setInitialState(initStates){
    for (var i = 0; i < initStates.length; i++){
      this.setState(initStates[i][0], initStates[i][1], 1)
    }
  }
}

gen = new Generation(105, 65)
gen.setInitialState([
  [2, 3],
  [3, 4]
])
console.log(gen.member[1][3].current)
gen.evolve()