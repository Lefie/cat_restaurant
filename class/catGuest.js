

class Guest{
    constructor(x,y){
      this.x = x
      this.y = y
      this.w = 50
      this.h = 40
      this.graphic = catSpritesheet2
      this.desiredW = 100
      this.desiredH = 80
      this.desiredX = 400
      this.desiredY = 500
      this.count = 0
      //target w && h : width : 100, h : 80
      this.noiseOffsetX = random(0,1000)
      this.status = "walking"
      this.isSeated = false
    }
  
    moveAndDisplay(){
      imageMode(CENTER)
      if(this.status === "walking"){
  
         image(guestFrame[guestFrameIndex],this.x,this.y,this.w,this.h) 
        if(frameCount % 30 == 0){
          guestFrameIndex = (guestFrameIndex + 1) % guestFrame.length;
        }
       
  
    
  
        let distToSpot = dist(this.x,this.y,spot1.x,spot1.y)
        //fill("blue")
        //text("GUEST TO SPOT1 "+ distToSpot,10,10)
        //stroke("blue")
        //line(spot1.x,spot1.y,this.x,this.y)
  
        if(distToSpot < 160){
          if(this.x > this.desiredX){
            this.x -= 0.7
          }
  
          if(this.x < this.desiredX){
            this.x += 0.7
          }
  
          if(this.y < this.desiredY){
            this.y += 0.7
          }
  
          if(this.y > this.desiredY){
            this.y -= 0.7
          }
  
          if(distToSpot < 65){
            this.x = this.desiredX
            this.y = this.desiredY
            this.status = "standing"
          }
          
        }
    
        this.y += 0.3
        let noiseValueX = noise(this.noiseOffsetX)
        let moveAmount = map(noiseValueX,0,1,-3,3)
        this.x += moveAmount
        this.x = constrain(this.x,240,500)
        this.y = constrain(this.y,0,450)
        this.noiseOffsetX += 0.01
  
      
    
        if(this.w < this.desiredW){
          this.w += 0.1
        }
        if(this.h < this.desiredH){
          this.h += 0.08
        }
  
        
  
      }else if(this.status === "standing"){
         this.isSeated = true
          this.graphic = guestPic
          image(this.graphic,this.x,this.y,this.w,this.h)
  
          /*
         TODO : order food blah blah blah
         */
          
          this.count += 1
          if(this.count > 150){
            this.status = "leaving"
          }
  
      }else if(this.status === "leaving"){
        this.x += 1
          image(guestFrame[guestFrameIndex],this.x ,this.y,this.w,this.h) 
        if(frameCount % 30 == 0){
          guestFrameIndex = (guestFrameIndex + 1) % guestFrame.length;
        }
      
          
        }
        
      }
      
  }

  