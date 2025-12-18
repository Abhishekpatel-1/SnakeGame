// AI Difficulty Adjustment
function getAISpeed(score) {
    if (score < 5) return 200;
    if (score < 10) return 150;
    if (score < 20) return 100;
    return 80;
}

// Predictive Food Placement
function generateSmartFood(snake, gridSize) {
    let head = snake[0];
    let futureX = head.x + 1;
    let futureY = head.y;

    return {
        x: (futureX + Math.floor(Math.random() * gridSize)) % gridSize,
        y: (futureY + Math.floor(Math.random() * gridSize)) % gridSize
    };
}
