

/*
type : 
bg - the big yellow table
sm - the small table where the food is placed

*/
class Table{
    constructor(x,y,type){
      this.x = x
      this.y = y
      this.type = type
      this.graphic = type === "bg" ? table : smTable
  
    }
  
    display(){
     imageMode(CENTER)
     if(this.type === "bg"){
      image(this.graphic,this.x,this.y)
     
     }
  
     if(this.type === "sm"){
      image(this.graphic,this.x,this.y)
      rectMode(CENTER)
      noStroke()
      fill("white")
      rect(this.x,this.y-10,50,50)
     }
     
    }
  }