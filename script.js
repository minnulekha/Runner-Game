const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ground = 220;

let player = {
    x: 50,
    y: ground,
    width: 20,
    height: 40,
    yVelocity: 0,
    jumping: false
};

let obstacle = {
    x: canvas.width,
    y: ground,
    width: 20,
    height: 40,
    speed: 5
};

let gravity = 1.5;
let jumpPower = -20;

// Jump on Spacebar
document.addEventListener("keydown", function(e) {
    if (e.code === "Space" && !player.jumping) {
        player.yVelocity = jumpPower;
        player.jumping = true;
    }
});

function update() {
    // Gravity logic
    player.yVelocity += gravity;
    player.y += player.yVelocity;

    // Collision with ground
    if (player.y > ground) {
        player.y = ground;
        player.jumping = false;
    }

    // Move obstacle to the left
    obstacle.x -= obstacle.speed;

    // Reset obstacle when off screen
    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = canvas.width + Math.random() * 300; // Add randomness
    }

    // Collision detection with obstacle
    if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
    ) {
        alert("Game Over!");
        document.location.reload(); // Reload game
        return;
    }

    draw();
    requestAnimationFrame(update);
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = "#888";
    ctx.fillRect(0, ground + player.height, canvas.width, 10);

    // Draw player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw obstacle
    ctx.fillStyle = "red";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}


// Start the game loop
update();
