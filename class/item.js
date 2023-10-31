

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
  
  