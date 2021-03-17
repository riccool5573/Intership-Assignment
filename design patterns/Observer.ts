interface Observer{ //make an interface for the subject with an update function and a boolean to store the subjects status
    update(subject: Subject);
    SubStatus: Boolean;
}
interface Subject{ //make an interface for the subject, with functions to subscribe and unsubscribe from the observer, as well as notify
    Subscribe(Ob: Observer);
    Unscubscribe(Ob: Observer);
    notify();
}

class ClassSubject implements Subject{ //the class subject, has a list of Observers, and boolean for status
    observers: Observer[];
    status: boolean;

    Subscribe(Ob: Observer){ //the subject includes the observer given to the function to the list of observers
        this.observers.includes(Ob);
        this.observers.push(Ob);
    }
    Unscubscribe(Ob:Observer){ //the subject removes the given observer from the list of observers
        let Index = this.observers.indexOf(Ob);
        delete  this.observers[Index];
    }
    public notify(){ //runs through the list of observers and runs update on all of them
        for(let Observer of this.observers){
                Observer.update(this);
        }
    }
    ASubject(){ //the actual code would go here, for now here's a piece of code that randomly sets a boolean true or false, and then notifies the observers
        this.status = Math.random() < 0.5;
        this.notify();
    }
}
//class observer, which has an update function which will watch for a specific change in the subjects status. and writes in the console if the status is true
class ClassObserverA implements Observer{
    SubStatus: Boolean;
    update(Sub: Subject){
        this.SubStatus = Update(Sub);
        if(this.SubStatus){
            console.log("Observer A reacted to something");
        }
    }
}
//another class observer, which watches for a different change in the subjects status. and writes in the log if the status is false
//note: there must be a better way to do this than to create 2 different observers entirely, maybe have one that triggers different functions
//depending on the subjects status? regardless, don't really have time to experiment with it.
class ClassObserverB implements Observer{
    SubStatus: Boolean;
    update(Sub: Subject){
        this.SubStatus = Update(Sub);
        if(!this.SubStatus){
            console.log("Observer B reacted to something");
        }
    }
}
//an Update function, which checks and returns the status of the subject, is better if multiple observers are needed to watch for the status,
//if only 1 observer will suffice this function is obsolete.
function Update(Sub: Subject){ 
    bool: Boolean; 
    if(Sub instanceof ClassSubject){
        this.bool = Sub.status
        return this.bool;
    }
}
