const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

let gameScore = 0;
let isGameOverSoundPlayed = false; 

// Audio
const gameOver = new Audio();
gameOver.src = "./sounds/lose.wav";

const bird = new Bird();
const pipe = new Pipe();
const bg = new Background(0, 0);
const bg2 = new Background(bg.size.width, 0);

// Game loop
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Game logic 
    bg.update(bird.isDead);
    bg2.update(bird.isDead);
    pipe.update();
    bird.update();

    c.beginPath();
    c.fillStyle = "white";
    c.font = "30px sans serif";
    c.fillText(gameScore, 10, 40);

    if (bird.isDead) {
        if (!isGameOverSoundPlayed) {
            gameOver.play();
            isGameOverSoundPlayed = true;
        }
        clearInterval(intervalId);
        c.font = "30px Arial";
        c.fillStyle = "black";
        c.fillText("GAME OVER", 110, canvas.height / 2);
        c.fillText("Score: " + gameScore, 140, canvas.height / 1.8);
    }
    requestAnimationFrame(animate);
}

const intervalId = setInterval(() => {
    gameScore++;
}, 1000);

document.addEventListener("keydown", () => {
    bird.jump();
});

animate();
