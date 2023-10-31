

let bg;

//cat
let cat;
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

//order
let order




function preload(){
  bg = loadImage("imgs/bg.png")
  cat = loadImage("imgs/neutral.png")

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

  //order
  order = new Order(guest.x,350);

  //frames for cat player
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

  order.display()
  order.detectCollisionWithMouse()



  image(coin,50,40,50,50)

 

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

/* customer
if(frameCount % 10 === 0){
    customerOffset += 330
  }
  image(catSpritesheet2,150,130,100,80,customerOffset,0,320,250)

  if(customerOffset > catSpritesheet2.width){
    customerOffset = 0
  }

*/