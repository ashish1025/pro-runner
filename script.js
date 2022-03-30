// all variables here

const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext('2d');
var boxHeight = 75;
var boxWidth = 75;
var obstacleHeight = 250;
var obstacleWidth = 50;
var xposition = 10;
var yposition = canvas.height - boxHeight - 5;
var dx = 2;
var gravity = true;
var leftPressed = false;
var rightPressed = false;
// var ox1 = canvas.width - obstacleWidth;
// var ox2 = canvas.width - obstacleWidth;
// var oy1 = canvas.height - obstacleHeight;
// var oy2 = canvas.height - obstacleHeight;
var obstacles = [];
var cnt = 0;
var f = 0;
var f2 = 0;
var score = 0;
var highScore = parseInt(localStorage.getItem("score"));

/* hackermode:-i) use vertically assymmetric shap like triangle as a runner
ii) generate different shaped obstacles that move up and down
iii) generate power-ups on the map that activates abilities for sometime like invincibility

*/

// randome numbers generator for width of the obstacle
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

// 0 and 1 generator for y-axis of obstacle
function getrandomInt(max) {
    return Math.floor(Math.random() * max);
}

// assign widths to x-axis
for (var i = 0; i < 15; i++) {
    obstacles[i] = { width: generateRandom(50, 500), x: canvas.width, y: getrandomInt(2), flag: 0 };
}

obstacles.forEach(obstacle => {
    if (obstacle.y == 0) {
        obstacle.y = 0;
    }
    else {
        obstacle.y = canvas.height - obstacleHeight;
    }
});

// getrandomInt(2) gives 0 or 1 randomly

// even listeners 
document.addEventListener("keypress", gravityHandler);
document.addEventListener("keyup", keyupHandler);
document.addEventListener("keydown", keydownHandler);

function gravityHandler(e) {
    if (e.key == " ") {
        if (gravity == true) {
            gravity = false;
            yposition = 5;
        }
        else {
            gravity = true;
            yposition = canvas.height - boxHeight - 5;
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

// to keep track of score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("score: " + score, canvas.width - 100, canvas.height - 50);
}
// for high score
function drawHighScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("HighScore: " + highScore, canvas.width - 125, 50);
}

// runner
function drawBox() {
    ctx.beginPath();
    ctx.rect(xposition, yposition, boxWidth, boxHeight);
    ctx.fillStyle = "#DC143C";
    ctx.fill();
    ctx.closePath();
}
// obstacle
function drawObstacle() {
    obstacles.forEach(obstacle => {
        if (obstacle.flag == 1) {
            ctx.beginPath();
            ctx.rect(obstacle.x, obstacle.y, obstacle.width, obstacleHeight);
            ctx.fillStyle = "cyan";
            ctx.fill();
            ctx.closePath();
        }
    });
}
// to initiate the game
if (!f) {
    obstacles[0].flag = 1;
}
// draw function (main function)
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBox();
    drawObstacle();
    drawScore();
    drawHighScore();

    if (leftPressed) {

        xposition -= dx;
        if (xposition <= 0) {
            xposition = 0;
        }
    }
    if (rightPressed) {
        xposition += dx;
    }

    for (var i = 0; i < 15; i++) {
        //f = 0;
        if (obstacles[i].flag == 1) {

            var ox1 = obstacles[i].x;
            var oy1 = obstacles[i].y;
            ox1 -= dx;
            if (ox1 + obstacles[i].width <= 0) {
                //cnt++;
                obstacles[i].flag = 0;
                ox1 = canvas.width;
                score++;
                if (score % 2 == 0) {
                    dx += 1;
                }
            }

            if ((ox1 < xposition + boxWidth && ox1 + obstacleWidth > xposition) && (oy1 < yposition && oy1 + obstacleHeight > yposition)) {
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
            if (ox1 + obstacles[i].width <= 2 * (canvas.width) / 3) {
                if (i + 1 == 15) {
                    // i = 0;
                    obstacles[0].flag = 1;
                }
                else {
                    var next = i + 1;
                    obstacles[next].flag = 1;
                    //obstacles[i + 1].x = canvas.width;
                }

            }
            obstacles[i].x = ox1;
        }

    }
    requestAnimationFrame(draw);
}
draw();

