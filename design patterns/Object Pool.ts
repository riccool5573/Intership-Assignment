class EnemyObject{ // create a class enemyobject, inside is a definition of it's class and speed
    Class: string;
    Speed: Number;
    get _Class(){
        return this.Class; //make getters and setters for the class and speed, so i can empty those values once it needs to be put back into the pool
    }
    set _Class(S: string){
        this.Class = S;
    }
    get _Speed(){
        return this.Speed;
    }
    set _Speed(N: Number){
        this.Speed = N;
    }
}


class Pool{
    Available: EnemyObject[]; //make the pool, 2 lists, one for available objects, one for objects that are in use.
    InUse: EnemyObject[]; //note: tried making these lists, but unsure about how to do so.
    enemypooled; //also an empty variable to temporarily store the data of enemyobject in when switching between the two
    GetObject(){
        //if there is an object in available, it is moved to Inuse, and removed from available.
        if(this.Available[0] != null){ 
            this.enemypooled = this.Available[0];
            this.InUse[0] = this.enemypooled;
            delete this.Available[0];
            return this.enemypooled; //on second look im not sure if the value of enemypooled is cleaned after getobject() is over. it probably is, but this language is weird sometimes so it might not be
        }
        // if there are no objects in available, one is created and then immediatly moved to inuse.
        else{
            this.enemypooled = new EnemyObject(); 
            this.InUse[0] = this.enemypooled;
            return this.enemypooled;
        }
    }
    //once the object has been used this will be run, grabs the object from inuse, cleans the data on it, and moves it back to available
    CleanUp(){
        if(this.InUse[0] != null){ 
            this.enemypooled = this.InUse[0];
            this.enemypooled._Class(null);
            this.enemypooled._Speed(null);
            delete this.InUse[0];
            this.Available[0] = this.enemypooled;
        }
    }
}

