import * as PIXI from 'pixi.js';
import {app, rows, collumns, EndGame} from './app';


interface segment{ //an interface with all the needed stuff for a segment.
    row: number;
    collumn: number;
    x: number;
    y: number;
    Move(dir: number): void;
    Draw(URL: string): void;
}
let temp: number = 1; //i don't quite remember why temp is here, but it vaguely remember it having to do with scope
export class SnakeSegment implements segment{ //a class with all the things needed for the segment, using the interface with everything needed for a segment.
    row: number = 10; //set what row and collumn it starts on
    collumn: number = 10;
    x: number = collumns[this.collumn]; //it's actual X and Y coordinates 
    y: number = rows[this.row]; 
    position: number[] = [this.row, this.collumn];
    direction: number = 1; //a number for the direction 
    ticker: boolean = false; //a bool to make sure only one instance of the ticker is running
    sprite!: PIXI.Sprite; // the sprite
    GetDirection(){
        return this.direction;
    }
    GetTemp(){
        return temp;
    }
    GetPosition(){
        return this.position;
    }
   public SetDirection(N: number){
        this.direction = N;
    }
    Move(dir: number){ //a switchcase to see what direction it needs to move in.
        switch(dir){ //depending on direction, it will add or remove 1 from row or collumn, and if the player turns, it will also angle the sprite to look in the right direction.
            case 1:
                this.row--;
                this.sprite.angle = 0;
                if(this.row <= 0){
                    EndGame(); //if the player goes off the grid, game ends
                } 
                this.UpdatePosition();
                break;
            case 2:
                this.collumn++;
                this.sprite.angle = 90;
                if(this.collumn > 21){
                    EndGame();
                } 
                this.UpdatePosition();
                break;
            case 3:
                this.row++;
                this.sprite.angle = 180;
                if(this.row > 21){
                    EndGame();
                } 
                this.UpdatePosition();
                break;
            case 4:
                this.collumn--;
                this.sprite.angle = 270
                if(this.collumn <= 0){
                    EndGame();
                } 
                this.UpdatePosition();
                break;
        }
    }
    UpdatePosition(){ //a function to update this segment's position.
        this.x = collumns[this.collumn];
        this.y = rows[this.row];
        this.sprite.position.x = this.x;
        this.sprite.position.y = this.y;
        this.position = [this.row, this.collumn];
    }
    //could've probably made draw a function within app.ts and exported it to the other scripts, but got no time to refactor
    Draw(URL: string){
        //From my research and being stuck on this for about 4 hours, it would seem that for whatever reason
        //pixi can't load local images, even when just using the basic code given by the documentation,
        //which should just spawn a sprite and spin it around.
        //regardless, for now i've got a local webserver setup on which i will have the files
        //which need to be loaded by pixi.

        
        app.loader.add("sprite", URL).load((_loader, resources) => { // loads the picture given to the function and makes it a sprite
            this.sprite = new PIXI.Sprite(resources.sprite.texture);
            
            this.sprite.position.x = app.screen.width /2;
            this.sprite.position.y = app.screen.height /2;
            this.sprite.anchor.x = 0.5;
            this.sprite.anchor.y = 0.5;
            this.sprite.scale.x = 0.5;
            this.sprite.scale.y = 0.5;
        
            app.stage.addChild(this.sprite);
            app.loader.reset(); //clear out the loader so i can reuse this bit of code
        });
        if (!this.ticker){ //making sure only 1 ticker is running, otherwise the game will slowdown every tick
        app.ticker.add(() => {
            document.addEventListener('keydown', function(event) {
                switch(event.code){ // listen for keypresses and then set temp to the direction pressed
                    case "ArrowUp":
                        temp = 1;
                        break;
                    case "ArrowRight":
                        temp = 2;
                        break;
                    case "ArrowDown":
                        temp = 3;
                        break;
                    case "ArrowLeft":
                        temp = 4;
                        break;
                }
              });
            app.renderer.render(app.stage);
            this.ticker = true;
            
        });}
        this.SetDirection(temp); 
    
    }

       
}





