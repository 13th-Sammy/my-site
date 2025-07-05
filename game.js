const canvas=document.getElementById("Game");
const ctx=canvas.getContext("2d");

let birdY=100;
let birdVelocity=0;
const gravity=0.5;

const pipeWidth=60;
let pipeX=canvas.width;
let pipeGap=100;
let pipeTopHeight=Math.floor(Math.random()*canvas.height-pipeGap-100)+50;

const birdImg=new Image();
birdImg.src="assets/bird.png";
birdImg.onload=function() {
    gameLoop();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    birdVelocity=birdVelocity+gravity;
    birdY=birdY+birdVelocity;

    ctx.drawImage(birdImg, 100, birdY, 40, 40);

    pipeX=pipeX-2;
    if(pipeX+pipeWidth<0) {
        pipeX=canvas.width;
        pipeTopHeight=Math.floor(Math.random()*canvas.height-pipeGap-100)+50;
    }

    ctx.fillStyle="green";
    ctx.fillRect(pipeX, 0, pipeWidth, pipeTopHeight);

    const pipeBottomY=pipeTopHeight+pipeGap;
    ctx.fillRect(pipeX, pipeBottomY, pipeWidth, canvas.height-pipeBottomY);

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(e) {
    if(e.code === "Space") {
        birdVelocity=-8;
    }
})