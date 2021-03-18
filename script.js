const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLengt = 2;

let baitX = 5;
let baitY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const gulpSound = new Audio("gulp.mp3");
const gameOverSound = new Audio("gameover.mp3");

// game loop
function drawGame() {
    changeSnakePosition();

    let result = isGameOver();
    if (result) {
        return;
    }

    clearScreen();    

    checkBaitCollistion();
    drawBait();
    drawSnake();

    drawScore();

    if (score > 2) {
        speed = 11;
    }
    if (score > 5) {
        speed = 15;
    }
    if (score > 10) {
        speed = 20;
    }
    if (score > 15) {
        speed = 25;
    }
    if (score > 20) {
        speed = 30;
    }
    if (score > 25) {
        speed = 35;
    }
    if (score > 30) {
        speed = 50;
    }

    setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;

    // snake-body
    if (yVelocity === 0 && xVelocity === 0) {
        return false;
        gameOverSound.play();
    }

    // walls
    if (headX < 0) {
        gameOver = true;
        gameOverSound.play();
    }
    else if (headX === tileCount) {
        gameOver = true;
        gameOverSound.play();
    }
    else if (headY < 0) {
        gameOver = true;
        gameOverSound.play();
    }
    else if (headY === tileCount) {
        gameOver = true;
        gameOverSound.play();
    }

    for (let i = 0; i< snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            gameOverSound.play();
            break;
        }
    }
    

    if (gameOver) {
        ctx.fillStyle ='white';
        ctx.font = '50px Verdana';

        ctx.fillText("Game Over!", canvas.width / 8, canvas.height / 2);
    }

    return gameOver;
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = "10px verdana";
    ctx.fillText("Score: " + score, canvas.width -55, 10);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
}

function drawSnake() {    
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
    while (snakeParts.length > tailLengt) {
        snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawBait() {
    ctx.fillStyle = 'red';
    ctx.fillRect(baitX * tileCount, baitY * tileCount, tileSize, tileSize);
}

function checkBaitCollistion() {
    if (baitX === headX && baitY === headY) {
        baitX = Math.floor(Math.random() * tileCount);
        baitY = Math.floor(Math.random() * tileCount);
        tailLengt++;
        score++;
        gulpSound.play();
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    // up
    if (event.keyCode == 38) {
        if (yVelocity == 1)
            return;

        yVelocity = -1;
        xVelocity = 0;
    }

    // down
    if (event.keyCode == 40) {
        if (yVelocity == -1)
            return;

        yVelocity = 1;
        xVelocity = 0;
    }

    // left
    if (event.keyCode == 37) {
        if (xVelocity == 1)
            return;

        yVelocity = 0;
        xVelocity = -1;
    }

    // right
    if (event.keyCode == 39) {
        if (xVelocity == -1)
            return;

        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();
