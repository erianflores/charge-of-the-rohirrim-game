class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#end-screen");
    this.livesElement = document.querySelector("#lives");
    this.player = new Player(90, 280, 80, 80, "../Images/King Theoden.png");

    this.height = 600;
    this.width = 1000;
    this.obstacles = [new Obstacle()];
    this.gameLoopFrequency = 1000 / 60;
    this.gameIsOver = false;
    this.score = 0;
    this.lives = 3;
    this.counter = 0;

    this.target = [new Target()];
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "flex";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }
  gameLoop() {
    this.update();
    if (this.gameIsOver === true) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    this.counter++;
    // this.obstacles.forEach((obstacle) => obstacle.move());
    this.player.move();

    if (this.counter % 160 === 0) {
      this.obstacles.push(new Obstacle());
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      const currentObstacle = this.obstacles[i];
      currentObstacle.move();

      const didCollide = this.player.didCollide(currentObstacle);
      console.log("did it collide", didCollide);

      if (didCollide) {
        this.obstacles.splice(i, 1);
        currentObstacle.element.remove();
        this.lives--;
        this.livesElement.innerText = this.lives;
      }
    }

    if (this.lives === 0) {
      console.log("you died, you lost all your lives");
      this.gameIsOver = true;
      this.player.element.remove();
      this.obstacles.forEach((oneObstacle) => {
        oneObstacle.element.remove();
      });
      this.gameScreen.style.display = "none";
      this.endScreen.style.display = "block";
    }
  }
}
