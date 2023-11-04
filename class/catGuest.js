let add = false
let subtract = false
let counterAdd = 0
let counterSub = 0
let counter = 0
let answered = false
let correctMatch = false
let placedSucc = false
let pickedItem1;
let pickedItem2;


let dict = {
    "egg": "l'omelette",
    "toast" : "Pain grillé",
    "waffle" : "Gaufre",
    "oj" : "Jus d'orange",
    "milk" : "Lait",
    "coffee ": "Café"
}



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
      this.count = int(random(20,70))
      //target w && h : width : 100, h : 80
      this.status = "hanging"
      this.isSeated = false
      this.order1 = new Order(this.x,this.y)
      
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

      if(this.status === "ordering"){
        this.orderFood()
      }


      /* 
      part of ordering food. 
      if add is true, then show the coin +10 
      if subtract is true, then show the coin -10
      */
      if(add == true){
        counterAdd += 1
        if(counterAdd <= 100){
            fill("green")
            ellipse(400,350,40,40)
            image(coin,400,350,30,30)
            text("+10",420,370)
        }else{
            add = false
            counterAdd = 0
            answered = true
        }
        }

       if(subtract == true){
        counterSub += 1
        if(counterSub <= 100){
            fill("red")
            ellipse(400,350,40,40)
            image(coin,400,350,30,30)
            text("-10",420,370)
        }else{
            subtract = false
            counterSub = 0
            answered = true
        }
        
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
        if(this.count >= random(200,800)){
            if(spot1.isAvailable ){
                this.spot = spot1
                spot1.isAvailable = false
                this.status = "walking"
            }
            else{
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
        this.status = "ordering"

    }

    orderFood(){
        this.graphic = guestPic
        image(this.graphic,this.x,this.y,this.w,this.h)
       // order1 = new Order(this.x,this.y - 80)
       if(answered === false){
        this.order1.display()
        pickedItem1 = this.order1.item1
        pickedItem2 = this.order1.item2
        
       }
       
        
        let correct = this.order1.checkCorrectness()
        let userAns = this.order1.detectCollisionWithMouse()

        text("is this correct"+correct,240,120)
        text("is user Ans " + userAns,240,150)

        if(correct === true && userAns === "accepted"){
           correctMatch = true
            add = true
        }

        else if(correct === true && userAns === "rejected"){
           
            subtract = true
        }

        else if(correct === false && userAns === "accepted"){
           
            subtract = true
        }

        else if(correct === false && userAns === "rejected"){
           
            add = true
            
        }
        if(answered === true && (correctMatch!= true)){
            this.status = "leaving"
        }

        //if the food order is placed correctly and player accepts the order
        if(correctMatch === true){
            let one
            let two
            text("left item: " + this.order1.item1 , 600, 200)
            text("right item : " + catPlayer.withItemRight,500,300)
            text("item from dict: " + dict[catPlayer.withItem],600,300)
            text("item from dict: " + dict[catPlayer.withItemRight],600,400)
           
            
             //update whether or not cat is holding the correct items
             if(catPlayer.withItemRight && catPlayer.withItem){
                one = pickedItem1 === dict[catPlayer.withItem]
                two = pickedItem2 === dict[catPlayer.withItemRight]
            }
            text("grabbed the left item?: " + one,600,350)
            text("grabbed the right item ? " + two,600,450)
            text("placed success ? " + placedSucc,650,500)

           


            let d = dist(catPlayer.x,catPlayer.y,spot1.x,spot1.y)
            //once the distance is close enough, check correctness
            if( d < 62 ){
                
                if(one === true && two === true){
                    placedSucc = "yes"
                }else{
                    placedSucc = "no"
                }

            }

            if(placedSucc === "yes"){
                add = true
                this.status = "leaving"
            }

            if(placedSucc === "no"){
                subtract = true
                placedSucc = false
                
            }
            
            

        }

    }

    leaving(){
        answered = false
        this.isSeated = false
        spot1.isAvailable = true
        placedSucc = false
        pickedItem1 = null
        pickedItem2 = null
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


  

 


 


  



 
  