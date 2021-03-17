import {SnakeSegment} from './Snake';
import {Apple} from "./Apple";
import * as PIXI from 'pixi.js';

let framesSinceLastUpdate: number = 0; //A timer to keep track of how many frames it's been since the last tick
var canvas: any = document.getElementById("canvas"); // getting the canvas, spend hours trying to pass it to app, but this works, not sure why
let score: number = 0;
let headPos: number[]; //the positions on the rows and collumns for the head and the apples
let applePos: number[];
let Snake: Array<Array<number>>;
export const rows: number[] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0); //make 21 long arrays for rows and numbers, which will serve as our grid
export const collumns: number[] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0); //i've got honestly no clue how i'd make a 21 long array. it doesnt help that nowhere i can find an example of this.
let head: SnakeSegment = new SnakeSegment(); //create the head of the snake
let apple: Apple = new Apple();
let body: SnakeSegment = new SnakeSegment();
export const app = new PIXI.Application({
    backgroundColor: 0xffffff,
    view: canvas, //set the view to the canvas.
});



function init(){
    
    for (let i in rows){ //assign the values for each one of in the arrays in a for loop
        var x = parseInt(i);
        rows[i] = app.screen.height/21 * (x + 1);
        console.log(rows[i]);
    }
    
    for (let i in collumns){
        var x = parseInt(i);
        collumns[i] = app.screen.width/21 * (x + 1);
        console.log(collumns[i]);
    }

    head.Draw("http://192.168.2.193:8887/body.png"); //draw the head of the snake, taken from a local webserver as pixi cant load local files (update, webserver is now online)
    
    main(); //run main the first time
}
init();


function main(){ //the main function keeps track of the game speed, the players score, and how fast ticks are done.
    let standardSpeed: number = 4; //a standard speed for the actual speed to go off of.
    let speed: number;
    let temp;
    if(score == 0 || score == null){ //make sure speed is not null or infinite
        speed = standardSpeed;
    }
    else{
        speed = standardSpeed * (score/2);
    }
    window.requestAnimationFrame(main); //run main every frame.
    if(framesSinceLastUpdate < 60 / speed){ //check if the game should tick
        framesSinceLastUpdate += 1;
    }
    else{//and if it does reset the counter to 0
        framesSinceLastUpdate = 0;
        temp = head.GetTemp();
        head.Move(temp);
        if(!apple.spawned){ //check if an apple has been spawned, and if not spawn one
            apple.Spawn(); //spawn the apple
        }
        headPos = head.GetPosition(); //get the position of the head an the apple
        applePos = apple.GetPosition();
        Snake.push(headPos); //push the position of the head, for later use in the body
        console.log(headPos);
        console.log(applePos);
        if (headPos[1] == applePos[1]){ //compare them and see if they're on the same position (does not work flawlessly, but it'll do)
            apple.Delete();
            score++;
            body.Draw("http://192.168.2.193:8887/body_vertical.png");
            
        }
        

    }
    if(!app.loader.loading){ //make sure the loader is not still loading anything, and then make sure the apple sprite has not been instanciated yet
        if(apple.sprite == null){
            apple.Draw("http://192.168.2.193:8887/apple.png");
        }
    }

}




