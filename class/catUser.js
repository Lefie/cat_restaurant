class Cat{
    constructor(x,y){
      this.x = x
      this.y = y
      this.graphic = cat
      this.w = 110
      this.h = 80
      this.desiredX = x
      this.desiredY = y
      this.status = "standing"
      this.withItemLeft = "nothing"
      this.withItemRight = "nothing"
    }
  
    display(){
      imageMode(CENTER)
      if(this.status === "standing"){
        this.graphic = cat
        image(this.graphic,this.x,this.y,this.w,this.h)
        if(this.withItemLeft === "egg"){
          image(eggItem.graphic,this.x,this.y,50,50)
        }
        if(this.withItemLeft === "toast"){
          image(toastItem.graphic,this.x,this.y,50,50)
        }
        if(this.withItemLeft === "waffle"){
          image(waffleItem.graphic,this.x,this.y,50,50)
        }
        if(this.withItemRight === "oj"){
          image(ojItem.graphic,this.x+35,this.y,50,50)
        }
  
        if(this.withItemRight === "milk"){
          image(milkItem.graphic,this.x+35,this.y,50,50)
        }
  
        if(this.withItemRight === "coffee"){
          image(coffeeItem.graphic,this.x+35,this.y,50,50)
        }
  
       
      }
  
      if(this.status === "moving"){
  
         image(frames[frameIndex],this.x,this.y,this.w,this.h) 
        if(frameCount % 30 == 0){
          frameIndex = (frameIndex + 1) % frames.length;
        }
      
        if(this.withItemLeft === "egg"){
          image(eggItem.graphic,this.x,this.y,50,50)
        }
        if(this.withItemLeft === "toast"){
          image(toastItem.graphic,this.x,this.y,50,50)
        }
        if(this.withItemLeft === "waffle"){
          image(waffleItem.graphic,this.x,this.y,50,50)
        }
        if(this.withItemRight === "oj"){
          image(ojItem.graphic,this.x + 35,this.y,50,50)
        }
        if(this.withItemRight === "milk"){
          image(milkItem.graphic,this.x + 35,this.y,50,50)
        }
        if(this.withItemRight === "coffee"){
          image(coffeeItem.graphic,this.x + 35,this.y,50,50)
        }
  
      
      }

      if(this.status === "done"){
        this.graphic = catDone
        image(this.graphic,this.x,this.y)
        if(score >= 10){
          fill("pink")
          textSize(30)
          text("good job!",this.x,this.y - 280)

        }else if (score < 10){
          fill("pink")
          textSize(30)
          text("Practice more!",this.x,this.y - 280)

        }

      }
  
    }
  
    move(){
  
      //text(this.status,100,200)
  
      
      if(mouseIsPressed && (mouseY > 500 && mouseY < 760) &&(mouseX > 100 && mouseX < 670)){
       this.status = "moving"
        this.desiredX = mouseX
        this.desiredY = mouseY
        this.desiredX = constrain(this.desiredX,230,550)
        this.desiredY = constrain(this.desiredY,570,760)
      }
  
    
  
  
  
     if(this.status !== "standing"){
  
        
          let diff = dist(this.x,this.y,this.desiredX,this.desiredY)
          //stroke("black")
          //line(this.x,this.y,this.desiredX,this.desiredY)
          //text("diff btw"+diff,100,150)
      
        
            if(diff > 10){
              
              fill("black")
              //text("desiredX" + this.desiredX,10,100)
              //text("desiredY" + this.desiredY,10,200)
  
              if(this.x > this.desiredX){
                this.x -= 1.5
              }
  
              if(this.x < this.desiredX){
                this.x += 1.5
              }
  
              if(this.y < this.desiredY){
                this.y += 1.5
              }
  
              if(this.y > this.desiredY){
                this.y -= 1.5
              }
          
            
            }else{
              this.x = this.desiredX
              this.y = this.desiredY
              this.status = "standing"
            }      
              
          }
      
      }
  
      pickUp(){
        
      
        if(dist(eggItem.x,eggItem.y,this.x,this.y) < 82 && this.status === "standing"){
          this.withItemLeft = "egg"
         
        }
  
        if(dist(toastItem.x,toastItem.y,this.x,this.y) < 82  && this.status === "standing"){
          this.withItemLeft = "toast"
        }
  
        if(dist(waffleItem.x,waffleItem.y,this.x,this.y ) < 82 && this.status === "standing"){
          this.withItemLeft = "waffle"
        }
  
        if(dist(ojItem.x,ojItem.y,this.x,this.y ) < 105 && this.status === "standing"){
          this.withItemRight = "oj"
        }
  
        if(dist(milkItem.x,milkItem.y,this.x,this.y ) < 105 && this.status === "standing"){
          this.withItemRight = "milk"
        }
  
        if(dist(coffeeItem.x,coffeeItem.y,this.x,this.y ) < 105 && this.status === "standing"){
          this.withItemRight = "coffee"
        }
  
    
      }
  
      dropOff(){
        fill("red")
        //text("DISTANCE"+dist(spot1.x,spot1.y,this.x,this.y),500,20)
        if(((dist(spot1.x,spot1.y,this.x,this.y) < 62)) && this.status == "standing"
         ){
           this.withItemLeft = "nothing"
           this.withItemRight = "nothing"
        }
       
  
      }
  
    
  }
  