window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");

  const grid = 20;
  let snake = [{ x: 200, y: 200 }];
  let direction = { x: grid, y: 0 };
  let apple = randomPosition();

  function randomPosition() {
    return {
      x: Math.floor(Math.random() * 20) * grid,
      y: Math.floor(Math.random() * 20) * grid
    };
  }

  function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100); // controls speed
  }

  function update() {
    const head = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y
    };

    // wrap around
    head.x = (head.x + canvas.width) % canvas.width;
    head.y = (head.y + canvas.height) % canvas.height;

    snake.unshift(head);

    // eat apple
    if (head.x === apple.x && head.y === apple.y) {
      apple = randomPosition();
    } else {
      snake.pop();
    }

    // self collision
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        resetGame();
      }
    }
  }

  function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: grid, y: 0 };
    apple = randomPosition();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // apple
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, grid, grid);

    // snake
    ctx.fillStyle = "green";
    snake.forEach(segment => {
      ctx.fillRect(segment.x, segment.y, grid, grid);
    });
  }

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && direction.y === 0) {
      direction = { x: 0, y: -grid };
    } else if (e.key === "ArrowDown" && direction.y === 0) {
      direction = { x: 0, y: grid };
    } else if (e.key === "ArrowLeft" && direction.x === 0) {
      direction = { x: -grid, y: 0 };
    } else if (e.key === "ArrowRight" && direction.x === 0) {
      direction = { x: grid, y: 0 };
    }
  });

  gameLoop();
});
