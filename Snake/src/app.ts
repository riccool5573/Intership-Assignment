import {SnakeSegment} from './Snake';
import {Apple} from './Apple';
import * as PIXI from 'pixi.js';
var fs = require('browserify-fs');

let framesSinceLastUpdate: number = 0; //A timer to keep track of how many frames it's been since the last tick
var canvas: any = document.getElementById("canvas"); //getting the canvas, spend hours trying to pass it to app, but this works, not sure why
let score: number = 0;
let headPos: number[]; //the positions on the rows and collumns for the head and the apples
let applePos: number[];
let Snake: Array<Array<number>> = new Array();
let scoreBoard: Array<number> = new Array();
export const rows: number[] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0); //make 21 long arrays for rows and numbers, which will serve as our grid
export const collumns: number[] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0); //i've got honestly no clue how i'd make a 21 long array. it doesnt help that nowhere i can find an example of this.
let head: SnakeSegment = new SnakeSegment(); //create the head of the snake
let apple: Apple = new Apple();
let body: Array<SnakeSegment> = new Array(); 

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

    head.Draw("http://127.0.0.1:8887/body.png"); //draw the head of the snake, taken from a local webserver as pixi cant load local files (update, webserver is now online)
    
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
        speed = standardSpeed * score;
    }
    if(!app.loader.loading && apple.sprite == null){ //make sure the loader is not still loading anything, and then make sure the apple sprite has not been instanciated yet
        apple.Draw("http://127.0.0.1:8887/apple.png");
    }
    window.requestAnimationFrame(main); //run main every frame.
    if(framesSinceLastUpdate < 60 / speed){ //check if the game should tick
        framesSinceLastUpdate += 1; //making game speed dependent on FPS is stupid i know, but it's the easiest way for this, and FPS shouldn't be much of an issue
    }
    else{//and if it does reset the counter to 0
        framesSinceLastUpdate = 0;
        temp = head.GetTemp();
        head.Move(temp);
        if(!apple.spawned && apple.sprite != null){ //check if an apple has been spawned, and if not spawn one
            apple.Spawn(); //spawn the apple
        }
        headPos = head.GetPosition(); //get the position of the head and the apple
        applePos = apple.GetPosition();
        Snake.unshift(headPos); //push the position of the head, for later use in the body
        for (let i in body){
            let x: number = parseInt(i); //go through all the body parts, make sure they are on the right position
            let position: Array<number> = Snake[x + 1]; 
            body[x].row = position[0];
            body[x].collumn = position[1];
            body[x].UpdatePosition();
            if(body[x].position[0] == headPos[0] && body[x].position[1] == headPos[1]){ //then for each bodypart check if its colliding with the head
                EndGame(); 
            }
        }
        if (headPos[0] == applePos[0] && headPos[1] == applePos[1]){ //compare the apple and head position and see if they're on the same position (does not work flawlessly, but it'll do)
            apple.Delete(); //if they are remove the apple, add 1 to score, and create a new bodypart
            score++;
            let segment: SnakeSegment = new SnakeSegment();
            body.unshift(segment); //add the bodypart to the array
            body[0].Draw("http://127.0.0.1:8887/body_vertical.png"); //and render it
        }
    }
}

export function EndGame(){ //ends the game

    fs.readFile("score.txt", "utf8", (error: any, data: any) => {  //this seems to store only one int at a time, dont know if i can make this work
        let scores = data.toString(); //take the scores from the file
        scoreBoard.push(parseInt(scores)); //push them into the scoreboard
        console.log(scoreBoard);
        scoreBoard.push(score); //push our local score into the scoreboard
        scoreBoard.sort; //sort the scoreboard
    })
    for (let i in scoreBoard){
        console.log(i);
        fs.writeFile("score.txt", i.valueOf + "\n", function error(error: any){
        
            if (error){
                console.log(error);
            }
        })
    }
    //the only way to get a scoreboard working would likely be through nodeJS and mySQL, and both are my achillesheel.
    let c = confirm('you died. \n \n Score: ' + score);     //show a prompt with the player's score

    if (c){
        window.location.reload(); //game restarts if "ok" is pressed
    }
    else{
        window.close(); //if cancel is pressed just close the tab
    }
}