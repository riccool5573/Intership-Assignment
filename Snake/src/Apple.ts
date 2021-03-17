import * as PIXI from 'pixi.js';
import {app, rows, collumns} from "./app";

interface apple{ 
    sprite: PIXI.Sprite;
    row: number;
    collumn: number;
    x: number;
    y: number;
}

export class Apple implements apple{ //the apple class, keeping track of the sprite and it's position in the grid
    sprite!: PIXI.Sprite;
    row!: number;
    collumn!: number;
    position: number[] = [this.row,this.collumn];
    spawned: boolean = false;
    x: number = collumns[this.collumn];
    y: number = rows[this.row];
    Draw(URL: string){
        app.loader.add("apple", URL).load((_loader, resources) => { //draw the apple
            this.sprite = new PIXI.Sprite(resources.apple.texture);
            
            this.sprite.position.x = app.screen.width /2;
            this.sprite.position.y = app.screen.height /2;
            this.sprite.anchor.x = 0.5;
            this.sprite.anchor.y = 0.5;
            this.sprite.scale.x = 0.5;
            this.sprite.scale.y = 0.5;
        
            app.stage.addChild(this.sprite);
            //no need to clear the loader for this one as this one is only run once, in hindsight could've made a function for this, but got no time
        });
    }
    Spawn(){ //takes a random position on the board, and then places the apple there,
        this.row = Math.floor(Math.random() * Math.floor(21) + 1);
        this.collumn = Math.floor(Math.random() * Math.floor(21) + 1);
        this.spawned = true;
        this.UpdatePosition();
    }
    Delete(){ //"deletes" the apple
        this.row = 0;
        this.collumn = 0;
        this.spawned = false;
    }
    GetPosition(){ //returns the position of the apple 
        return this.position;
    }
    UpdatePosition(){ //a function to update this segment's position.
    this.x = collumns[this.collumn];
    this.y = rows[this.row];
    this.position = [this.row, this.collumn];
    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;
}
}
