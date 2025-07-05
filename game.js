const canvas=document.getElementById("Game");
const ctx=canvas.getContext("2d");

let birdY=100;
let birdVelocity=0;
const gravity=0.5;

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

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function(e) {
    if(e.code === "Space") {
        birdVelocity=-8;
    }
})