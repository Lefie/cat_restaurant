

class Spot{
    constructor(x,y,type){
      this.x = x
      this.y = y
      this.graphic  = spot
      this.s = 50
      this.isAvailable = true
      this.type = type
    }

    display(){
      imageMode(CENTER)
      image(this.graphic,this.x,this.y,this.s,this.s)
  
    }

    


  }