class Spot{
    constructor(x,y){
      this.x = x
      this.y = y
      this.graphic  = spot
      this.s = 50
    }
    display(){
      imageMode(CENTER)
      image(this.graphic,this.x,this.y,this.s,this.s)
  
    }
  }