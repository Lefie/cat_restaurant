

class Order{
  constructor(x,y){
    this.x = x
    this.y = y
    this.c = color(0,100,0)
    this.w = 100
    this.h = 100
    this.item1 = "someword1"
    this.item2 = "someword2"
    
  
   
    
  }
  
  display(){
    noStroke()
    rectMode(CENTER)
    ellipseMode(CENTER)
    fill("white")
    rect(this.x,this.y,this.w,this.h,20)
    fill("black")
    text(this.item1,this.x - 30,this.y-20)
    text(this.item2,this.x - 30,this.y)
    fill("red")
    ellipse(this.x-30,this.y+30,20,20)
    fill("green")
    ellipse(this.x+30,this.y+30,20,20)
   
  }

  detectCollisionWithMouse(){
    stroke("red")
    text(mouseX+" " +mouseY,100,20)
    text("order :"+this.x+" " +this.y,450,20)
    let dRed = dist(mouseX,mouseY,this.x+30,this.y + 30)
    let dGreen = dist(mouseX,mouseY,this.x-30,this.y + 30)
    line(mouseX,mouseY,this.x+30,this.y + 30)
    line(mouseX,mouseY,this.x-30,this.y + 30)
    text("red: " +dRed,50,100)
    text("Green: " +dGreen,50,120)

    if(mouseIsPressed && dRed >= 50 && dRed <= 68 && mouseY >= this.y + 20 && mouseY <= this.y + 40  ){
        
        text("clicked!", 80,100)
        fill("blue")
        noStroke()
        ellipse(this.x-30,this.y+30,20,20)
    }

    if(mouseIsPressed && dGreen >= 50 && dGreen <= 68 && mouseY >= this.y + 20 && mouseY <= this.y + 40  ){
        
        text("clicked!", 80,100)
        fill("blue")
        noStroke()
        ellipse(this.x+30,this.y+30,20,20)
    }
  }
}
