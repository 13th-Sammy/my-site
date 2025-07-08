const canvas=document.getElementById("Game");
const ctx=canvas.getContext("2d");

let gameOver=false;
let score=0;

let pipeGap=150;
const pipeCount=2;
const pipeSpacing=450;
const pipeWidth=60;

function generatePipeHeight() {
    const minTopHeight=50;
    const maxTopHeight=canvas.height-pipeGap-50;
    return Math.floor(Math.random()*(maxTopHeight-minTopHeight+1))+minTopHeight;
}

let pipes=[];
for(let i=0; i<pipeCount; i++) {
    const topHeight=generatePipeHeight();
    pipes.push({
        x:canvas.width+i*pipeSpacing,
        topHeight:topHeight,
        passed:false
    });
}

let birdY=100;
let birdVelocity=0;
const birdX=100;
const birdWidth=40;
const birdHeight=40;
const gravity=0.5;

const birdImg=new Image();
birdImg.src="assets/bird.png";
if(birdImg.complete) {
    gameLoop();
} 
else {
    birdImg.onload = function() {
        gameLoop();
    };
}

function flap() {
    birdVelocity=-8;
}

function checkCollision(pipe) {
    const pipeBottomY=pipe.topHeight+pipeGap;

    if(birdY < 0 || birdY+birdHeight > canvas.height) {
        return true;
    }

    if(birdX+birdWidth > pipe.x && birdX < pipe.x+pipeWidth &&
       (birdY < pipe.topHeight || birdY+birdHeight > pipeBottomY)) {
        return true;
    }
    
    return false;
}

function restartGame() {
    birdY=100;
    birdVelocity=0;
    pipes=[];
    for(let i=0; i<pipeCount; i++) {
        const topHeight=generatePipeHeight();
        pipes.push({
            x:canvas.width+i*pipeSpacing,
            topHeight:topHeight,
            passed:false
        });
    }
    score=0;
    gameOver=false;
    gameLoop();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    birdVelocity=birdVelocity+gravity;
    birdY=birdY+birdVelocity;

    ctx.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);

    ctx.fillStyle="green";

    for(let i=0; i<pipes.length; i++) {
        let pipe=pipes[i];

        pipe.x=pipe.x-2;

        if(!pipe.passed && pipe.x+pipeWidth < birdX) {
            score++;
            pipe.passed=true;
        }

        if(pipe.x+pipeWidth<0) {
            pipe.x=canvas.width+(pipeCount-1)*pipeSpacing;
            pipe.topHeight=generatePipeHeight();
            pipe.passed=false;
        }

        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);

        const pipeBottomY=pipe.topHeight+pipeGap;
        ctx.fillRect(pipe.x, pipeBottomY, pipeWidth, canvas.height-pipeBottomY);

        if(checkCollision(pipe)) {
            gameOver=true;
        }
    }

    if(gameOver) {
        ctx.font="30px Arial";
        ctx.fillStyle="red";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        return;
    }

    ctx.textAlign="left";
    ctx.fillStyle="white";
    ctx.font="24px Arial";
    ctx.fillText("Score: "+score, 20, 40);

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
    if(gameOver) {
        if(e.code === "Space") {
            restartGame();
        }
    }
    else if(e.code === "Space") {
        flap();
    }
});

document.addEventListener("touchstart", (e) => {
    e.preventDefault();
    if(gameOver) {
        restartGame();
    }
    else {
        flap();
    }
}, {passive: false});