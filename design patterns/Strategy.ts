

interface Strats {
    getstrat(): void; //i thought this was the only way to get functions in classes, as i thought they had to be declared somewhere.
}

class EnemyStrat implements Strats { //create a class for an enemy
    random: number; //instantiate a number
   
    constructor(){
        this.random = RandomNum(); //give this number a random value between 0 and 2
    }
    getstrat(){ // i don't know if having a function below the constructor is bad practice or not, but here it is for now.
        if (this.random <= 1){ // check random to see if it's below 1, if it is run normalstrat, if it isn't run diffstrat.
            NormalStrat(this);
        }
        else{
            DiffStrat(this);
        }
    }
}

function RandomNum(){
return Math.floor(Math.random()*Math.floor(3));
}

let enemy1 = new EnemyStrat(); // instantiate an enemy
enemy1.getstrat(); //and run getstrat to indicate what strategy it should use


function NormalStrat(N: EnemyStrat){
  //in here strat 1: lets say go straight towards the player
}

function DiffStrat(N: EnemyStrat){
    // in here strat 2: go to the sides and try to cut the player off.
}