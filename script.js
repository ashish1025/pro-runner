const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext('2d');
var boxHeight = 75;
var boxWidth = 75;
var obstacleHeight = 250;
var obstacleWidth = 50;
var x = 10;
var y = canvas.height - boxHeight - 5;
var dx = 2;
var gravity = true;
var leftPressed = false;
var rightPressed = false;
var ox = canvas.width - obstacleWidth;
var oy = canvas.height - obstacleHeight;
var obstacles = [];
var cnt = 0;
var f = 0;
var score = 0;
var highScore = parseInt(localStorage.getItem("score"));

function generateRandom(min = 50, max = 500) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor(rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}
function getrandomInt(max) {
    return Math.floor(Math.random() * max);
}

for (var i = 1; i <= 15; i++) {
    obstacles[i] = { x: generateRandom(50, 500), y: getrandomInt(2) };
}

// getrandomInt(2) gives 0 or 1 randomly


document.addEventListener("keypress", gravityHandler);
document.addEventListener("keyup", keyupHandler);
document.addEventListener("keydown", keydownHandler);

function gravityHandler(e) {
    if (e.key == " ") {
        if (gravity == true) {
            gravity = false;
            y = 5;
        }
        else {
            gravity = true;
            y = canvas.height - boxHeight - 5;
        }
    }
}

function keyupHandler(e) {
    if (e.key == "ArrowLeft") {
        leftPressed = false;
    }
    if (e.key == "ArrowRight") {
        rightPressed = false;
    }
}

function keydownHandler(e) {

    if (e.key == "ArrowLeft") {
        leftPressed = true;
    }
    if (e.key == "ArrowRight") {
        rightPressed = true;
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("score: " + score, canvas.width - 100, canvas.height - 50);
}
function drawHighScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("HighScore: " + highScore, canvas.width - 125, 50);
}

function drawBox() {
    ctx.beginPath();
    ctx.rect(x, y, boxWidth, boxHeight);
    ctx.fillStyle = "cyan";
    ctx.fill();
    ctx.closePath();
}

function drawObstacle() {
    {
        if (f) {
            ctx.fill();
            obstacleWidth = obstacles[cnt].x;
            ox = canvas.width;
            if (obstacles[cnt].y == 0) {
                oy = 0;
            }
            else {
                oy = canvas.height - obstacleHeight;
            }
            f = 0;
        }
        ctx.beginPath();
        ctx.rect(ox, oy, obstacleWidth, obstacleHeight);
        ctx.fillStyle = "cyan";
        ctx.fill();
        ctx.closePath();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBox();
    drawObstacle();
    drawScore();
    drawHighScore();
    console.log("hello");
    ox -= dx;
    //score++;

    if (leftPressed) {

        x -= dx;
        if (x <= 0) {
            x = 0;
        }
    }
    if (rightPressed) {
        x += dx;
    }
    if (ox + obstacleWidth <= 0) {
        cnt++;
        score++;
        if (score % 2 == 0) {
            dx += 1;
        }
        if (cnt == 16) {
            cnt = 1;
            //dx += 2;
        }
        f = 1;
    }
    if ((ox <= x + boxWidth && ox + obstacleWidth > x) && (oy < y && oy + obstacleHeight > y)) {
        alert("Your score is " + score);
        if (localStorage.getItem("score")) {
            if (score > parseInt(localStorage.getItem("score"))) {
                localStorage.setItem("score", score);
            }
        } else {
            localStorage.setItem("score", score);
        }
        document.location.reload();
    }
    requestAnimationFrame(draw);
}
draw();



//drawBox();
