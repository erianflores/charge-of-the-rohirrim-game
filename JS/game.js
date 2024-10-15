class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#end-screen");
    this.player = new Player(90, 280, 80, 80, "../Images/King Theoden.png");

    this.height = 600;
    this.width = 1000;
    this.obstacles = [new Obstacle()];
    this.gameLoopFrequency = 1000 / 60;
    this.gameIsOver = false;
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

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
    this.obstacles.forEach((obstacle) => obstacle.move());
    this.player.move();
  }
}
