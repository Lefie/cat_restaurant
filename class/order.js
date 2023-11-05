
/*

vocab
food :
omellete : l'omelette
toast: Pain grillé
waffle: Gaufre

drink :
oj:  Jus d'orange
milk : Lait
coffee: Café

*/

let foodVocab = [
  ["l'omelette","l'omelatte","l'omelete"],
  ["Pain grillé","Pein grillé","Pain grilla"],
  ["Gaufre","Geufre","Guafre"]]

let drinkVocab = [
  ["Jus d'orange","Jus d'ornge","Jas d'orange"],
  ["Lait","Laite","Liat"],
  ["Café","Cofé","Caffé"]]





class Order{
  constructor(x,y){
    this.x = x
    this.y = y
    this.c = color(0,100,0)
    this.w = 100
    this.h = 100
    this.index1 = int(random(0, 3))
    this.index2 = 0//int(random(0, 2))
    this.item1 = foodVocab[this.index1][this.index2];
    this.item2 = drinkVocab[this.index1][this.index2];
    this.counter = 0
   
    

    
  }
  
  display(){

      noStroke()
      rectMode(CENTER)
      ellipseMode(CENTER)
      fill("white")
      rect(this.x,this.y,this.w,this.h,20)
      fill("black")
      text(foodVocab[this.index1][this.index2],this.x - 30,this.y-20)
      text(drinkVocab[this.index1][this.index2],this.x - 30,this.y)
      fill("red")
      ellipse(this.x-30,this.y+30,20,20)
      fill("green")
      ellipse(this.x+30,this.y+30,20,20)
    

  }

  detectCollisionWithMouse(oldVal){
    let val = -1
    //stroke("red")
    //text(mouseX+" " +mouseY,100,20)
    //text("order :"+this.x+" " +this.y,450,20)
    let dRed = dist(mouseX,mouseY,this.x+30,this.y + 30)
    let dGreen = dist(mouseX,mouseY,this.x-30,this.y + 30)
    line(mouseX,mouseY,this.x+30,this.y + 30)
    line(mouseX,mouseY,this.x-30,this.y + 30)
    text("red: " +dRed,50,100)
    text("Green: " +dGreen,50,120)

    

    if(mouseIsPressed && dRed >= 50 && dRed <= 68 && mouseY >= this.y + 20 && mouseY <= this.y + 40  ){
        
       fill("blue")
        noStroke()
       ellipse(this.x-30,this.y+30,20,20)
       console.log("Rje ---------------------")
        val =  0
        return val
        

    }

    if(mouseIsPressed && dGreen >= 50 && dGreen <= 68 && mouseY >= this.y + 20 && mouseY <= this.y + 40  ){
        
       text("clicked!", 80,100)
        fill("blue")
       noStroke()
       ellipse(this.x+30,this.y+30,20,20)
       console.log("Acp ---------------------")
        val = 1
        return val

    }

    return oldVal

    
  }

  checkCorrectness(){
    let food = false
    let drink = false

    for(let i = 0; i < 3;i++){
      if(foodVocab[i][0] === this.item1){
        food = true
      }
    }

    for(let i = 0; i < 3;i++){
      if(drinkVocab[i][0] === this.item2){
        drink = true
      }
    }

    return food && drink
   
   
  }
}
