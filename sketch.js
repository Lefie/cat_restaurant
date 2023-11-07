

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
let coinObj

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
let guest4
let guest5
let guest6
let guests = []
let backgroundCats = []
let guestFrame = []
let guestFrameIndex = 0



//test
let count = 0 // count customer
let pos = undefined;
let stat;
let placedSucc
let done

//score
let score = 0


//game state
let state = 0


//sound
let bgMusic
let canPlay = true
let meow;
let gamePlayStart = false
let pickup
let success
let fail
let cheer
let practice
let cheerOnce = false
let practiceOnce = false


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


  //sound
  bgMusic = loadSound("sound/bg_music.mp3")
  meow = loadSound("sound/meow.mp3")
  pickup = loadSound("sound/pickup.mp3")
  success = loadSound("sound/success.mp3")
  fail = loadSound("sound/buzz.mp3")
  cheer = loadSound("sound/cheer.mp3")
  practice = loadSound("sound/practice.mp3")

}




function setup(){
  let c = createCanvas(800,800)
  c.parent("#container")
  bg.resize(width,height)

 // bgMusic.loop()
 if(canPlay){
  bgMusic.loop()
 }


  //coin
  coinObj = new Coin(50,40,50)


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
  guest = new Guest(random(250,400),350)
  guest1 = new Guest(random(250,400),350)
  guest2 = new Guest(random(250,400),350)
  guest3 = new Guest(random(250,400),350)
  guest4 = new Guest(random(250,400),350)
  guest5 = new Guest(random(250,400),350)
  guest6 = new Guest(random(250,400),350)

  backgroundCats.push(guest)
  backgroundCats.push(guest1)
  backgroundCats.push(guest2)
  backgroundCats.push(guest3)
  backgroundCats.push(guest4)
  backgroundCats.push(guest5)
  backgroundCats.push(guest6)


  //guests.push(guest);
  guests.push(new Guest(random(250,400),350))
  

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


  //if state == 0
  //game start
  if(state === 0){
    
    gameStart()
  }else if(state === 1){
    gameLearning()
  }else if(state === 2){
    gamePlaying()
  }
  

}

function gameStart(){

  image(catDone,300,270,150,100)
  
  fill("white")
  textSize(30)
  text("Cat Restaurant!",300,450)
  
  // fill(120,200,230)
  // noStroke()
  // rect(200,500,100,50,30)
  // fill("white")
  textSize(20)
  text("Learn!",220,530)
  let learn = dist(mouseX,mouseY,250,525)
  stroke("red")
  //line(mouseX,mouseY,250,525)

  if(learn < 50){
    // fill(120,250,230)
    // noStroke()
    // rect(200,500,100,50,30)
    // fill("white")
   
    fill("green")
    textSize(20)
    text("Learn!",220,530)
    if(mouseIsPressed){
      state = 1
      

    }
  }

 

  // fill(120,200,230)
  // noStroke()
  // rect(500,500,100,50,30)
  fill("white")
  textSize(20)
  text("Play!",530,530)
  let play = dist(mouseX,mouseY,540,500)
  //stroke("red")
  //line(mouseX,mouseY,520,520)

  if(play < 50){
    // fill(120,250,230)
    // noStroke()
    // rect(500,500,100,50,30)
    fill("green")
    textSize(20)
    text("Play!",530,530)
    if(mouseIsPressed){
      state = 2
    }

  }



}

function gameLearning(){
  
  rectMode(CENTER)
  noStroke()
  fill(250,205,200)
  rect(width/2,height/2,700,700)
  image(oj,200,70,50,50)
  fill("black")
  text("Orange Juice",290,100)
  text("Jus d'orange",440,100)
  image(milk,200,170,50,50)
  text("Milk",290,200)
  text("Lait",440,200)
  image(toast,200,270,50,50)
  text("Toast",290,300)
  text("Pain grillé",440,300)
  image(egg,200,370,50,50)
  text("Egg",300,400)
  text("l'omelette",440,400)
  image(waffle,200,470,50,50)
  text("Waffle",290,500)
  text("Gaufre",440,500)
  image(coffee,200,570,50,50)
  text("Coffee",290,600)
  text("Café",440,600)


  

  // fill(120,200,230)
  // noStroke()
  // rect(420,590,100,50,30)
  fill("white")
  textSize(20)
  text("Play!",370,700)
  let play = dist(mouseX,mouseY,400,700)
  //stroke("red")
  //line(mouseX,mouseY,400,600)
  if(play < 50){
    // fill(120,250,230)
    // noStroke()
    // rect(420,590,100,50,30)
    fill("green")
    textSize(20)
    text("Play!",370,700)
    if(mouseIsPressed){
      state = 2
    }

  }

  

}

function gamePlaying(){

  imageMode(CENTER)
  //display score
  coinObj.display("regular")
  textSize(40)
  text(score ,100,50)
  textSize(10)
  if(gamePlayStart === false){
    meow.play()
    gamePlayStart = true
  }


  //background cats
  for(let i = 0; i < backgroundCats.length;i++){
    backgroundCats[i].hangingOut()
  }

  //guest  start

  for(let i = 0; i < guests.length;i++){
    if(guests[i].count <= 100){
     
      guests[i].hangingOut()
    }else if(guests[i].count > 100 && guests[i].isSeated === false && guests[i].status === "hanging" ){
      pos = guests[i].walking()
    }

    if(pos === "inPosition" ){
      stat = guests[i].seatedAndOrder()
    }

     if(stat === "leave"){
      pos = undefined
      done = guests[i].leaving()
    }
   else if(stat === "takeOrder"){
      pos = undefined
      placedSucc = guests[i].takeOrder(placedSucc)
      
    }

    if(placedSucc === "success"){
      stat = undefined
      done = guests[i].leaving()
    }

    

  if(done === "done"){
    
      guests.splice(i,1)
      i = i - 1
      guests.push(new Guest(random(300,400),350))
      count += 1
      stat = undefined
      done = undefined
      placedSucc = undefined
    }

    if(count >= 2){
      
      guests = []

    }

    }

    if(count >= 2){
      catPlayer.status = "done"
      // fill(120,200,230)
      //   noStroke()
      //   rect(450,300,100,50,30)
        fill("white")
        textSize(20)
        text("Restart",360,250)
        let start = dist(mouseX,mouseY,360,250)
        // stroke("red")
        // line(mouseX,mouseY,430,300)

        if(start < 50){
          // fill(120,250,230)
          // noStroke()
          // rect(450,300,100,50,30)
        fill("green")
        textSize(20)
        text("Restart",360,250)
          if(mouseIsPressed){
            done = undefined
            count = 0
            score = 0
            state = 0
            gamePlayStart = false
            catPlayer.status = undefined
            practiceOnce = false
            cheerOnce = false
            guests.push(new Guest(random(250,350),450))
            
          }

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
  // catPlayer.dropOff()


  //image(coin,50,40,50,50)
}

 


