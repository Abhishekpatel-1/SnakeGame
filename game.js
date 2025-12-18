const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const gridSize = canvas.width / box;

let snake = [{ x: 9, y: 9 }];
let direction = "RIGHT";
let score = 0;
let gameInterval;

// Initial food
let food = generateSmartFood(snake, gridSize);

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? "lime" : "green";
        ctx.fillRect(s.x * box, s.y * box, box, box);
    });

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * box, food.y * box, box, box);

    let head = { ...snake[0] };

    if (direction === "UP") head.y--;
    if (direction === "DOWN") head.y++;
    if (direction === "LEFT") head.x--;
    if (direction === "RIGHT") head.x++;

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").innerText = score;
        food = generateSmartFood(snake, gridSize);
        restartGameLoop(); // 🔥 AI difficulty update
    } else {
        snake.pop();
    }

    // Collision detection
    if (
        head.x < 0 || head.y < 0 ||
        head.x >= gridSize || head.y >= gridSize ||
        collision(head, snake)
    ) {
        clearInterval(gameInterval);
        alert("Game Over! Score: " + score);
        location.reload();
    }

    snake.unshift(head);
}

function collision(head, body) {
    return body.some(seg => seg.x === head.x && seg.y === head.y);
}

// 🔥 Dynamic AI loop
function restartGameLoop() {
    clearInterval(gameInterval);
    gameInterval = setInterval(draw, getAISpeed(score));
}

// Start game
restartGameLoop();
