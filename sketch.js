
let bg;

//cat
let cat;
let catRun;
let catLeft;
let catRight;
let catAway;
//sprite sheet ?
let catWalk
let catPlayer
let catSpritesheet2
let guestPic
let guest



//table 
let table;
let smTable;
let spot
let spot1
let spot2
let spot3

let yellowTable;
let smolTbl1;
let smolTbl2;
let smolTbl3;
let smolTbl4;
let smolTbl5;
let smolTbl6;

//food
let egg
let eggItem
let toast
let toastItem
let waffle
let waffleItem

//drink
let oj
let ojItem
let coffee
let coffeeItem
let milk
let milkItem

//coin
let coin;

//move 
let x = 0
let offset = 345
let customerOffset = 0

//frames
let frames = [];
let frameIndex = 0


let guestFrame = []
let guestFrameIndex = 0




function preload(){
  bg = loadImage("imgs/bg.png")
  cat = loadImage("imgs/neutral.png")
  catRun = loadImage("imgs/run.png")
  catLeft = loadImage("imgs/left.png")
  catRight = loadImage("imgs/right.png")
  catAway = loadImage("imgs/walkingAway.png")
  table = loadImage("imgs/t.png")
  smTable = loadImage("imgs/sm_t.png")
 
  spot = loadImage("imgs/spot.png")
  coin = loadImage("imgs/coin.png")
  egg = loadImage("imgs/egg.png")
  toast = loadImage("imgs/toast.png")
  waffle = loadImage("imgs/waffle.png")
  oj = loadImage("imgs/oj.png")
  coffee = loadImage("imgs/coffee.png")
  milk = loadImage("imgs/milk.png")
  catWalk = loadImage("imgs/catwalk.png")
  catSpritesheet2 = loadImage("imgs/customer.png")
  guestPic = loadImage("imgs/guest.png")

}




function setup(){
  let c = createCanvas(800,800)
  c.parent("#container")
  bg.resize(width,height)


  /*
  customer cat 
  */

  //set table
  yellowTable = new Table(400,550,"bg");
  spot1 = new Spot(yellowTable.x,yellowTable.y-40)
  spot2 = new Spot(yellowTable.x-80,yellowTable.y -40)
  spot3 = new Spot(yellowTable.x+80,yellowTable.y -40)

  
  //small tables
  smolTbl1 = new Table(150,600,"sm")
  smolTbl2 = new Table(150,670,"sm")
  smolTbl3 = new Table(150,740,"sm")
  smolTbl4 = new Table(650,600,"sm")
  smolTbl5 = new Table(650,670,"sm")
  smolTbl6 = new Table(650,740,"sm")

  //food
  eggItem = new Item(150,590,"egg");
  toastItem = new Item(150,660,"toast")
  waffleItem = new Item(150,730,"waffle")

  //drink
  ojItem = new Item(650,580,"oj")
  milkItem = new Item(650,660,"milk")
  coffeeItem = new Item(650,730,"coffee")

  //player cat
  catPlayer = new Cat(500,650)

  //cat guest 
  guest = new Guest(450,250)

  //frames for cat walk
  for (let x = 0; x < catWalk.width; x += 329) {
    let frame = catWalk.get(x, 0, 329, 263);
    frames.push(frame);
  }

  //frames for cat guest
  for (let x = 0; x < catSpritesheet2.width; x += 329) {
    let frame = catSpritesheet2.get(x, 0, 329, 263);
    guestFrame.push(frame);
  }


 
  

}



function draw(){
  imageMode(CORNER)
  image(bg,0,0)

  guest.moveAndDisplay()

  yellowTable.display()
  spot1.display()
  spot2.display()
  spot3.display()

  catPlayer.display()
  catPlayer.move()
 
  smolTbl1.display()
  smolTbl2.display()
  smolTbl3.display()
  smolTbl4.display()
  smolTbl5.display()
  smolTbl6.display()

  eggItem.display(smolTbl1)
  toastItem.display(smolTbl2)
  waffleItem.display(smolTbl3)
  ojItem.display(smolTbl4)
  milkItem.display(smolTbl5)
  coffeeItem.display(smolTbl6)

  catPlayer.pickUp()
  catPlayer.dropOff()



  image(coin,50,40,50,50)

 

}




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


/*
type: 
egg
toast
waffle
milk
coffee
oj

*/
class Item {
  constructor(x,y,type){
    this.x = x
    this.y = y
    this.type = type
    this.s = 50
    this.graphic
  }

  display(tbl){
    imageMode(CENTER)
    if(this.type == "egg"){
      this.graphic = egg
    }

    if(this.type == "waffle"){
     this.graphic = waffle
    }

    if(this.type == "toast"){
      this.graphic = toast
    }

    if(this.type == "oj"){
      this.graphic = oj
    }

    if(this.type == "milk"){
      this.graphic = milk
    }

    if(this.type == "coffee"){
     this.graphic = coffee
    }

    image(this.graphic,tbl.x,tbl.y-10,this.s,this.s)
  }




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
        this.w += 0.05
      }
      if(this.h < this.desiredH){
        this.h += 0.05 
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
    this.withItem = "nothing"
    this.withItemRight = "nothing"
  }

  display(){
    imageMode(CENTER)
    if(this.status === "standing"){
      this.graphic = cat
      image(this.graphic,this.x,this.y,this.w,this.h)
      if(this.withItem === "egg"){
        image(eggItem.graphic,this.x,this.y,50,50)
      }
      if(this.withItem === "toast"){
        image(toastItem.graphic,this.x,this.y,50,50)
      }
      if(this.withItem === "waffle"){
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
    
      if(this.withItem === "egg"){
        image(eggItem.graphic,this.x,this.y,50,50)
      }
      if(this.withItem === "toast"){
        image(toastItem.graphic,this.x,this.y,50,50)
      }
      if(this.withItem === "waffle"){
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
              this.x -= 1
            }

            if(this.x < this.desiredX){
              this.x += 1
            }

            if(this.y < this.desiredY){
              this.y += 1
            }

            if(this.y > this.desiredY){
              this.y -= 1
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
        this.withItem = "egg"
       
      }

      if(dist(toastItem.x,toastItem.y,this.x,this.y) < 82  && this.status === "standing"){
        this.withItem = "toast"
      }

      if(dist(waffleItem.x,waffleItem.y,this.x,this.y ) < 82 && this.status === "standing"){
        this.withItem = "waffle"
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
      if(((dist(spot1.x,spot1.y,this.x,this.y) < 62) ||
      (dist(spot2.x,spot2.y,this.x,this.y) < 62) || (dist(spot3.x,spot3.y,this.x,this.y) < 62)) && this.status == "standing"
       ){
         this.withItem = "nothing"
         this.withItemRight = "nothing"
      }
     

    }

  
}

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


// class Order{
//   constructor(x,y){
//     this.x = x
//     this.y = y
//     this.c = color(0,0,0)
//     this.w = 200
//     this.h = 100
//     this.item1 = "someword1"
//     this.item2 = "someword2"
//     this.btn = createButton("accept")
//     this.btn.size(60,30)
//     this.btn.position(this.x - 80,this.y+15)
//     this.btn.style("border-radius","100px")
//     this.btn2 = createButton("reject")
//     this.btn2.size(60,30)
//     this.btn2.position(this.x + 10,this.y+15)
//     this.btn2.style("border-radius","100px")
    
//   }
  
//   display(){
//     noStroke()
//     rectMode(CENTER)
//     fill("white")
//     rect(this.x,this.y,this.w,this.h)
//     fill("black")
//     text(this.item1,this.x - 40,this.y-20)
//     text(this.item2,this.x-40,this.y)

//   }
// }



/*
cat sprite sheet 
 if(frameCount % 30 == 0){
    offset += 345
  }

  x+= 0.5

  image(catWalk,0,0,100,80,offset,0,300,250) 

  if(offset >= catWalk.width){
    offset = 0
  }
*/

/* customer
if(frameCount % 10 === 0){
    customerOffset += 330
  }
  image(catSpritesheet2,150,130,100,80,customerOffset,0,320,250)

  if(customerOffset > catSpritesheet2.width){
    customerOffset = 0
  }

*/