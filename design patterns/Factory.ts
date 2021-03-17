interface Enemy{
GetType(): string; // once again to get functions inside of a class
}
// make the normal enemy type, which returns a string
class normalenemy implements Enemy{ 
     GetType(){ 
        return "Normal Enemy";
    }
}
// make the special enemy type which returns a string as well
class specialenemy implements Enemy{ 
    GetType(){
        return "Special Enemy";
    }
}


class Factory { // in the factory getEnemy is executed, which based on the number given to it, will create an enemy.
   GetEnemy(num: number){
        switch(num){
            case 1:
                return new normalenemy();
            case 2:
                return new specialenemy();
        }
    }
};