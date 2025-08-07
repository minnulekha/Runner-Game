const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ground = 220;

let player = {
    x: 50,
    y: ground,
    width: 40,
    height: 40,
    yVelocity: 0,
    jumping: false
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
}

// Start the game loop
update();
