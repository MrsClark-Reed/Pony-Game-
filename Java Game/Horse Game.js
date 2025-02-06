document.addEventListener("DOMContentLoaded", () => {
    const horse = document.getElementById("horse");
    const upButton = document.getElementById("up");
    const downButton = document.getElementById("down");
    const startButton = document.getElementById("start");
    const scoreDisplay = document.getElementById("score");
    const gameContainer = document.getElementById("game-container");
    const background = document.getElementById("background");

    let horsePosition = 50;
    let score = 0;
    let gameRunning = false;
    let starInterval;
    let backgroundPosition = 0;

    function moveHorse(direction) {
        if (!gameRunning) return; // Prevent movement if game hasn't started

        if (direction === "up" && horsePosition < 90) {
            horsePosition += 10;
        } else if (direction === "down" && horsePosition > 10) {
            horsePosition -= 10;
        }
        horse.style.bottom = horsePosition + "%";
    }

    function spawnStar() {
        if (!gameRunning) return;

        const star = document.createElement("div");
        star.classList.add("star");
        gameContainer.appendChild(star);

        let starPosition = gameContainer.clientWidth;
        let starHeight = Math.random() * 80 + 10;
        star.style.position = "absolute";
        star.style.top = starHeight + "%";
        star.style.left = starPosition + "px";
        star.style.width = "20px";
        star.style.height = "20px";
        star.style.backgroundColor = "yellow";
        star.style.borderRadius = "50%";

        let moveInterval = setInterval(() => {
            if (starPosition < 0) {
                clearInterval(moveInterval);
                star.remove();
            } else {
                starPosition -= 5;
                star.style.left = starPosition + "px";

                if (
                    starPosition < 100 &&
                    horsePosition < starHeight + 10 &&
                    horsePosition > starHeight - 10
                ) {
                    score++;
                    scoreDisplay.textContent = "Score: " + score;
                    clearInterval(moveInterval);
                    star.remove();

                    if (score === 10) {
                        setTimeout(() => {
                            alert("You're a winner!");
                            resetGame();
                        }, 100);
                    }
                }
            }
        }, 50);
    }

    function moveBackground() {
        if (!gameRunning) return;

        backgroundPosition -= 2;
        background.style.backgroundPosition = backgroundPosition + "px";
        requestAnimationFrame(moveBackground);
    }

    function startGame() {
        if (gameRunning) return;

        gameRunning = true;
        score = 0;
        scoreDisplay.textContent = "Score: 0";
        upButton.disabled = false;
        downButton.disabled = false;
        startButton.disabled = true;

        starInterval = setInterval(spawnStar, 2000);
        moveBackground();
    }

    function resetGame() {
        gameRunning = false;
        clearInterval(starInterval);
        document.querySelectorAll(".star").forEach(star => star.remove());
        upButton.disabled = true;
        downButton.disabled = true;
        startButton.disabled = false;
        background.style.backgroundPosition = "0px";
    }

    startButton.addEventListener("click", startGame);
    upButton.addEventListener("click", () => moveHorse("up"));
    downButton.addEventListener("click", () => moveHorse("down"));
});

