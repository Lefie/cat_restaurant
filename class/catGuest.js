
let counterAdd = 0
let counterSub = 0
let counter = 0
let answered = false
let correctMatch = false

let pickedItem1;
let pickedItem2;
let one = false
let two = false

let userAns = undefined
let correct = undefined

let coins = undefined
let earn
let loss
let timer1 = 0
let timer2 = 0



let dict = {
    "egg": "l'omelette",
    "toast" : "Pain grillé",
    "waffle" : "Gaufre",
    "oj" : "Jus d'orange",
    "milk" : "Lait",
    "coffee": "Café",
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
      this.spot = spot1//TODO : need to randomise it
      this.count = int(random(20,70))
      //target w && h : width : 100, h : 80
      this.status = "hanging"
      this.isSeated = false
      this.order1 = new Order(this.x,this.y)
      
    }
  
    moveAndDisplay(type){
      imageMode(CENTER)

    //   fill("red")
    //   ellipse(spot2.x,spot2.y-50,10,10)
      

      if(type === "hanging"){
        this.status === "hanging"
        this.hangingOut()
      }

      if(type === "walking"){
        this.status === "walking"
        this.walking()
      }

      if( type === "seated"){
        this.status === "seated"
        this.seatedAndOrder()
      }

     
      if(type === "leaving"){
        this.status === "leaving"
        let sta = this.leaving()
        return sta
      }
    
     
        
      }

    
    /*
    cat picks a random spot and walks
    */

    hangingOut(){
        //temp
        timer1 = 0
        timer2 = 0;
        //temp
        this.move()
        this.count += 1
        //ellipse(this.desiredX,this.desiredY,10)
        // stroke(255)
        // line(this.x,this.y,this.desiredX,this.desiredY)
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

        /*
        if(this.count >= random(200,800) ){
            if(spot1.isAvailable ){
                this.spot = spot1
                spot1.isAvailable = false
                this.status = "walking"
           
            }
            else{
                this.count = 0
                this.status = "hanging"
            }
        }
        */
        
      }
      

   

    /*
    walking over to be seated 
    -> whereever the cat is, it will walk towards the spot
    */
    walking(){
        //text(this.spot.type,300,10)
        
        this.move()
       

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

        let distToSpot = dist(this.x,this.y,this.spot.x,this.spot.y-50)
        // fill("blue")
        // text("GUEST TO SPOT2 "+ distToSpot,400,10)
        // stroke("blue")
        // line(this.spot.x,this.spot.y,this.x,this.y)
    
            
        if(distToSpot < 45){
            this.x = this.spot.x
            this.y = this.spot.y -50
            return "inPosition"

        }

    }

    seatedAndOrder(){
        this.status = "ordering"
        this.isSeated = true
        this.graphic = guestPic
        image(this.graphic,this.x,this.y,this.w,this.h)
        
        this.order1.display(answered)

        correct = this.order1.checkCorrectness()
        userAns = this.order1.detectCollisionWithMouse(userAns)

       

        coins = this.addOrLoseCoins()
        if(coins === "Add"){
            // earn = new Coin(this.x,this.y-40,30)
            // earn.display("earn")
            // timer1 += 1
            // if(timer1 < 400){
                
            //     earn.display("earn")
            // }else{
            //     answered = true
            // }
            score += 10
            answered = true

        }

        if(correct === true && userAns === 1){
            correctMatch = true
            return "takeOrder"
        }else if(correct === false && userAns === 0){
            return "leave"
        }

        if(coins === "Loss"){
            // loss = new Coin(this.x,this.y-40,30)
            // loss.display("loss")
            
            // timer2 += 1
            // if(timer2 < 400){
            //     loss.display("loss")
            // }else{
            //     answered = true
                

            // }
            score -= 10
            answered = true
            return "leave"
        }
        

    }

    takeOrder(oldV){

        this.graphic = guestPic
        image(this.graphic,this.x,this.y,this.w,this.h)

        pickedItem1 = catPlayer.withItemLeft
        pickedItem2 = catPlayer.withItemRight

        
       

        one = dict[pickedItem1] === this.order1.item1
        two = dict[pickedItem2] === this.order1.item2
        
        let d = dist(catPlayer.x,catPlayer.y,spot1.x,spot1.y)
        stroke("red")
        line(catPlayer.x,catPlayer.y,spot1.x,spot1.y)
        text(d,250,300)
        // text("word "+ dict[pickedItem1] + " " + this.order1.item1, 200,400 )
        //     text("word "+ dict[pickedItem2] + " " + this.order1.item2, 200,430 )

        if(d < 65){
            if( one === true && two === true){
                text("success",150,10)
                catPlayer.withItemLeft = "nothing"
                catPlayer.withItemRight = "nothing"
                score += 10
                return "success"
            
            }
        }
        

        return oldV

    }

    addOrLoseCoins(){
        if(correct === true && userAns === 1){
            success.play()
            return "Add"
        } else if(correct === true && userAns === 0){
            fail.play()
            console.log("lose coins - should have accepted")
            return "Loss"
        }else if(correct === false && userAns === 1) {
            fail.play()
            return "Loss"
        }else if(correct === false && userAns === 0){
            success.play()
            return "Add"
        }

    }


  

    leaving(){
        console.log("status"+this.status)
        console.log("answered"+answered)
        console.log("spot is avail"+spot1.isAvailable)
        console.log("item1"+pickedItem1)
        console.log("item2"+pickedItem2)
        console.log("correct match"+correctMatch)

        if(coins === "Loss"){
            loss = new Coin(this.x,this.y-40,30)
            loss.displayWithTimerLoss()
        }
        if(coins === "Add"){
            earn = new Coin(this.x,this.y-40,30)
            earn.displayWithTimerAdd()
        }
       

        

        answered = false
        this.isSeated = false
        spot1.isAvailable = true
        pickedItem1 = null
        pickedItem2 = null
        correctMatch = false
        userAns = undefined
        
        one = false
        two = false
        

        
        //go off screen
        this.x += 1.5
        this.move()
        if(this.x > 800){
            coins = undefined
            text("done",100,320)
            return "done"
        }
        
    }

    move(){
        image(guestFrame[guestFrameIndex],this.x,this.y,this.w,this.h) 
        if(frameCount % 50 == 0){
          guestFrameIndex = (guestFrameIndex + 1) % guestFrame.length;
        }
    }
      
  }



  



 
  