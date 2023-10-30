
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

let offset = 0


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
 
 
  
 // image(catWalk,200,200)
  //image(catWalk,100,0,100,80,0,0,300,250) 
  //image(catWalk,100,0,100,80,345,0,300,250) 
  
  //image(food,300,300,200,150,10,10,300,300)

  /*
  image(catRun,200,830,130,100)
  image(catLeft,380,830,130,100)
  image(catRight,580,830,130,100)
  image(catAway,780,630,130,100)
  */



}

function draw(){
  imageMode(CORNER)
  image(bg,0,0)

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
     
      if(frameCount % 25 == 0){
        offset += 345
      }
      
      image(catWalk,this.x,this.y,100,80,offset,0,300,250) 
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

      
     
    
      if(offset >= catWalk.width){
        offset = 0
      }
    }

    


  }

  move(){

    text(this.status,100,200)

    
    if(mouseIsPressed && (mouseY > 500 && mouseY < 760) &&(mouseX > 100 && mouseX < 670)){
      this.status = "moving"
      this.desiredX = mouseX
      this.desiredY = mouseY
      this.desiredX = constrain(this.desiredX,230,550)
      this.desiredY = constrain(this.desiredY,570,760)
    }

  let differenceX = this.desiredX - this.x
  let differenceY = this.desiredY - this.y



   if(this.status !== "standing"){

      
        let diff = dist(this.x,this.y,this.desiredX,this.desiredY)
        stroke("black")
        line(this.x,this.y,this.desiredX,this.desiredY)
        text("diff btw"+diff,100,150)
    
      
          if(diff > 10){
            
            fill("black")
            text("desiredX" + this.desiredX,10,100)
            text("desiredY" + this.desiredY,10,200)
        
            this.x += 0.01 * differenceX
            this.y += 0.01 * differenceY
    
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
      text("DISTANCE"+dist(spot1.x,spot1.y,this.x,this.y),500,20)
      if(((dist(spot1.x,spot1.y,this.x,this.y) < 62) ||
      (dist(spot2.x,spot2.y,this.x,this.y) < 62) || (dist(spot3.x,spot3.y,this.x,this.y) < 62)) && this.status == "standing"
       ){
         this.withItem = "nothing"
         this.withItemRight = "nothing"
      }
      // this.withItem = "nothing"
      // this.withItemRight = "nothing"

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