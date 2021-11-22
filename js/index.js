// constants and variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
const Score = document.getElementById('score')
const highscore = document.getElementById("highscore")
let flag=0;
// console.log(highscore);
// const highscorebox = document.querySelector('#highscorebox')
// console.log(highscorebox);
// const board = document.getElementById('board')
let speed=50;
let score=0;
let lastPaintTime=10;
let snakeArr = [ {x:9, y:9}];
let food = {x:12, y: 9};
// Game function
// ctime = current time
// above function will be repeated
// and will form game loop
// requestanim. will gove highest fps
// console.log(ctime);
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/7000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snakeArr) {
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y)
        return true;
    }
    // if you bump into wall
        if(snakeArr[0].x >= 23 || snakeArr[0].y >= 23 || snakeArr[0].x <= 0 || snakeArr[0].y <= 0)
        return true;

        return false;
}
function gameEngine() {
    // part - 1 
    // updating a snake array & food

    // if snake collide
     if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0,y: 0};// reset inupt direction
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
            highscore.innerHTML = "Highscore: " + hiscoreval;
        }
        alert("Game over! Press any key to play agian");
        snakeArr=[ {x:9, y:9}];//reset snake
        musicSound.play();
        score=0;
    }

    // if u food is eaten food increment score & reset food
    if(snakeArr[0].y === food.y &&  snakeArr[0].x == food.x) {
        foodSound.play();
        score++;
        // message.innerHTML = "";
        scorebox.innerHTML = "Score : "+score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        // update food location
        
        let a=2;
        let b=22; 
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
        //  if(flag==0 && score > hiscoreval) {
        //          message.innerHTML = "New High score"
        //          flag=1;
        //  }
        let i=0;
        if(i==0 && score > highscore){speed=100; i++;};
    } 
     // moving snake, iterating over snake
        for(let i=snakeArr.length-2;i>=0;i--) {
        //   snakeArr[i+1]=snakeArr[i]
        // above one will not work
        // so create new object
        snakeArr[i+1] = {...snakeArr[i]};
        }
        // updating snake's head
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
    

    // part - 2
    // render/Display the snake
    board.innerHTML = "";
    snakeArr.forEach((ele,idx)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = ele.y; 
        snakeElement.style.gridColumnStart = ele.x;
        
        if(idx==0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    })

    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y; 
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}


// main logic starts here
musicSound.play();
// for animation.. highly recommended
let hiscore = localStorage.getItem("hiscore");
let hiscoreval;
if(hiscore=== null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(localStorage.getItem(hiscore));
    highscore.innerHTML = "HighScore : "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:0};// start the game
    moveSound.play();
    // musicSound.play() 
    switch(e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})