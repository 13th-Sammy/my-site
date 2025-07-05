const canvas=document.getElementById("Game");
const ctx=canvas.getContext("2d");

let pipeGap=120;
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
        x: canvas.width+i*pipeSpacing,
        topHeight:topHeight
    });
}

let birdY=100;
let birdVelocity=0;
const gravity=0.5;

const birdImg=new Image();
birdImg.src="assets/bird.png";
birdImg.onload=function() {
    gameLoop();
}

function flap() {
    birdVelocity=-8;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    birdVelocity=birdVelocity+gravity;
    birdY=birdY+birdVelocity;

    ctx.drawImage(birdImg, 100, birdY, 40, 40);

    ctx.fillStyle="green";

    for(let i=0; i<pipes.length; i++) {
        let pipe=pipes[i];

        pipe.x=pipe.x-2;

        if(pipe.x+pipeWidth<0) {
            pipe.x=canvas.width+(pipeCount-1)*pipeSpacing;
            pipe.topHeight=generatePipeHeight();
        }

        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);

        const pipeBottomY=pipe.topHeight+pipeGap;
        ctx.fillRect(pipe.x, pipeBottomY, pipeWidth, canvas.height-pipeBottomY);
    }

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
    if(e.code === "Space") {
        flap();
    }
});

document.addEventListener("touchstart", (e) => {
    flap();
});