

class Coin{
    constructor(x,y,s){
        this.x = x
        this.y = y
        this.s = s
        this.graphic = coin 
        this.timer = 0
    }

    display(type){
        

        if(type === "regular"){
            image(this.graphic,this.x,this.y,this.s,this.s)

        }

        if(type === "loss"){
            fill("red")
            ellipse(this.x,this.y,40,40)
            image(this.graphic,this.x,this.y,this.s,this.s)
        }

        if(type === "earn"){
            fill("green")
            ellipse(this.x,this.y,40,40)
            image(this.graphic,this.x,this.y,this.s,this.s)

        }
        
    }
}