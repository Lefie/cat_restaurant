

let bg;

//cat
let cat;
//sprite sheet ?
let catWalk
let catPlayer
let catSpritesheet2
let catDone



//table 
let table;
let smTable;
let spot
let spot1
//let spot2
//let spot3

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

//guest
let guestPic
let guest
let guest1
let guest2
let guest3
let guests = []
let guestFrame = []
let guestFrameIndex = 0



//test
let count = 0




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
  catDone = loadImage("imgs/run.png")

}




function setup(){
  let c = createCanvas(800,800)
  c.parent("#container")
  bg.resize(width,height)


  //set table
  yellowTable = new Table(400,550,"bg");
  spot1 = new Spot(yellowTable.x,yellowTable.y-40,"two")
  //spot2 = new Spot(yellowTable.x-60,yellowTable.y -40,"one")

  
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
  guest = new Guest(450,350)
  guest1 = new Guest(400,300)
  guest3 = new Guest(400,300)

  //guests.push(guest);
  guests.push(new Guest(400,340))
  guests.push(new Guest(400,360))
  //guests.push(new Guest(400,380))
  //guests.push(guest1);
  //guests.push(guest3)

  


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
  //background img
  imageMode(CORNER)
  
  image(bg,0,0)
  
  imageMode(CENTER)

  //text(guest.status,700,100)
  text("Spot 1 Is Available ? "+spot1.type + " " + spot1.isAvailable,100,120)
  //text("Spot2 Is Available ? "+spot2.type + " " + spot2.isAvailable,250,140)
  //text("Spot3 Is Available ? "+" " + spot3.isAvailable,400,160)

  //guest  start


  for(let i = 0; i < guests.length;i++){
   let stat = guests[i].moveAndDisplay()
    if(stat === "done"){
      guests.splice(i,1)
      i = i - 1
    }
  }
 
  //guest  end


  //setting tables & spots
  yellowTable.display()
  spot1.display()

  //spot2.display()
 
 

   //player start
  catPlayer.display()
  catPlayer.move()
  //player end 

  if(guests.length === 0){
    catPlayer.status = "done"
  }
 
  smolTbl1.display()
  smolTbl2.display()
  smolTbl3.display()
  smolTbl4.display()
  smolTbl5.display()
  smolTbl6.display()

  //setting table end

  //setting items start
  eggItem.display(smolTbl1)
  toastItem.display(smolTbl2)
  waffleItem.display(smolTbl3)
  ojItem.display(smolTbl4)
  milkItem.display(smolTbl5)
  coffeeItem.display(smolTbl6)

  //setting items end
  catPlayer.pickUp()
  catPlayer.dropOff()


  image(coin,50,40,50,50)

 

}



