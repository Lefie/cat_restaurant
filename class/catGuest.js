

class Guest{
    constructor(x,y){
      this.x = x
      this.y = y
      this.w = 50
      this.h = 40
      this.graphic = catSpritesheet2
      this.desiredW = 100
      this.desiredH = 80
      this.desiredX = random(100,600)
      this.desiredY = random(300,400)
      this.spot //TODO : need to randomise it
      this.count = 0
      //target w && h : width : 100, h : 80
      this.status = "hanging"
      this.isSeated = false
      this.pickedSpot
    }
  
    moveAndDisplay(){
      imageMode(CENTER)

    //   fill("red")
    //   ellipse(spot2.x,spot2.y-50,10,10)
      

      if(this.status === "hanging"){
        this.hangingOut()
        text(this.pickedSpot,300,400)
      }

      if(this.status === "walking"){
        this.walking()
      }

      if(this.status === "seated"){
        this.seated()
      }
     
      if(this.status === "leaving"){
        this.leaving()
        }
        
      }

    
    /*
    cat picks a random spot and walks
    */

    hangingOut(){
        this.move()
        this.count += 1
        ellipse(this.desiredX,this.desiredY,10)
        stroke(255)
        line(this.x,this.y,this.desiredX,this.desiredY)
        if(this.x < this.desiredX){
            this.x += 0.4
        }
        if(this.x > this.desiredX){
            this.x -= 0.4
        }
        if(this.y > this.desiredY){
            this.y -= 0.4
        }
        if(this.y < this.desiredY){
            this.y += 0.4
        }

        if(dist(this.x,this.y,this.desiredX,this.desiredY) < 20){
            this.desiredX = random(100,600)
            this.desiredY = random(300,400)
        }

        //transition to walking if count >= 2000

        //once a seat is selected for a cat, it should no longer be available for others. 
        //once a cat has selected a seat, it should not consider a different seat
        if(this.count >= random(100,200)){
            if(spot1.isAvailable ){
                this.spot = spot1
                spot1.isAvailable = false
                this.status = "walking"
            }
            else if(spot2.isAvailable ){
                this.spot = spot2
                spot2.isAvailable = false
                this.status = "walking"
            }else{
                this.count = 0
            }

        }

    }

   

    /*
    walking over to be seated 
    -> whereever the cat is, it will walk towards the spot
    */
    walking(){
        text(this.spot.type,300,10)
        
        this.move()
        let distToSpot = dist(this.x,this.y,this.spot.x,this.spot.y-50)
        fill("blue")
        text("GUEST TO SPOT2 "+ distToSpot,400,10)
        stroke("blue")
        line(this.spot.x,this.spot.y,this.x,this.y)

        if(this.x < this.spot.x){
            this.x += 0.4
        }
        if(this.x > this.spot.x){
            this.x -= 0.4
        }

        if(this.y > this.spot.y-50){
            this.y -= 0.4
        }

        if(this.y < this.spot.y-50){
            this.y += 0.4
        }

         //grow in size as it gets closer
        if(this.w < this.desiredW){
            this.w += 0.3
        }
        if(this.h < this.desiredH){
            this.h += 0.3
        }
    
            
        if(distToSpot < 45){
            this.x = this.spot.x
            this.y = this.spot.y -50

            this.status = "seated"
            //this.seated()

        }

       

        
 
    }

    seated(){
        this.isSeated = true
        this.graphic = guestPic
        image(this.graphic,this.x,this.y,this.w,this.h)
  
        /*
         TODO : order food blah blah blah
         */

         /*
          
        this.count += 1
        if(this.count > 150){
        this.status = "leaving"
        }
        */

    }

    leaving(){
        this.isSeated = false
        //go off screen
        this.x += 1
        this.move()
    }

    move(){
        image(guestFrame[guestFrameIndex],this.x,this.y,this.w,this.h) 
        if(frameCount % 50 == 0){
          guestFrameIndex = (guestFrameIndex + 1) % guestFrame.length;
        }
    }
      
  }

 


 


  



 
  