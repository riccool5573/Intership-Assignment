interface State{ //create a state interface with a function to set the enemy sort
    SetEnemySort(Context: StateContext, name: string);
}
class NormalEnemy implements State{ //make a normal enemy and special enemy class, which when run will write in the console what type it is and the name given to said enemy
    SetEnemySort(Context: StateContext, name:string){
        console.log('Normal enemy ${name} spawned');
        Context.SetState(new SpecialEnemy()); //if a normal enemy has been spawned the state will switch to special
    }
}

class SpecialEnemy implements State{ //special spawns enemy and then switches back to normal enemy

        SetEnemySort(Context: StateContext, name: string){
            console.log('Special enemy ${name} spawned'); //unsure if ${name} actually works
            Context.SetState(new NormalEnemy());      
    }
        
}
class StateContext{ //the statecontext class, where is decided which type of enemy spawns.
    state: State;

    StateContext(){ 
        this.state = new NormalEnemy(); //i'm very confused about scope in this language, but i think this should set the state to normalenemy.
    }
    SetState(newState: State){ // a setter to set the state
        this.state = newState;
    }
    SetEnemySort(name: string){ // a function, which then runs the function setenemysort inside of the state,
        this.state.SetEnemySort(this,name);
    }
}
class StateDemo{ //an instance of statecontext is made
    Context: StateContext;
    main(){
        this.Context.StateContext(); //run statecontext to set the state to normalenemy, and then spawn 2 enemies called micheal and bob.
        this.Context.SetEnemySort("micheal");
        this.Context.SetEnemySort("Bob");
    } 
} 