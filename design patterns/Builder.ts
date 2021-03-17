//i'm a little confused about this one, about its implementation AND it's function, any examples i found were vague, so here's my best try

class Enemybuild{  //define what an enemy needs to be build
    Type: string; //an enemy type, a model, and a movement speed.
    Model: string;   
    Speed; number;
    public construct(type: string, model: string, speed: number){ //this function will put it together,
        this.Type = type;
        this.Model = model;
        this.Speed = speed;
    }
    public ShowEnemy(){ // and this function will show the results to the client
        console.log(this.Type);
        console.log(this.Model);
        console.log(this.Speed);
    }
}

class Client{
    build = new Enemybuild(); // client designates type, model, and speed, it gets put in the construct, and comes back out as an enemy.
     BuildAnEnemy(Type: string, Model: string, Speed: number){
            this.build.construct(Type, Model, Speed);
            this.build.ShowEnemy();
    }
    
}