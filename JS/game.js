class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#end-screen");
    this.livesElement = document.querySelector("#lives");
    this.player = new Player(90, 280, 80, 80, "./Images/King Theoden.png");

    this.height = 600;
    this.width = 1000;
    this.obstacles = [new Obstacle()];
    this.gameLoopFrequency = 1000 / 60;
    this.gameIsOver = false;
    this.score = 0;
    this.lives = 3;
    this.counter = 0;
    this.highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    this.scoreElement = document.querySelector("#score");
    this.livesElement = document.querySelector("#lives");
    this.finalScoreElement = document.querySelector("#final-score");

    this.targets = [new Target()];

    this.nazgul = new Audio("./Audio/Nazgul.mov");
    this.urukHaiSong = new Audio("./Audio/Uruk Hai song.mov");
    this.orcSound = new Audio("./Audio/Orc sound.m4a");
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

  checkCollision(obj1, obj2, buffer = 10) {
    return (
      obj1.x < obj2.x + obj2.width + buffer &&
      obj1.x + obj1.width > obj2.x - buffer &&
      obj1.y < obj2.y + obj2.height + buffer &&
      obj1.y + obj1.height > obj2.y - buffer
    );
  }

  update() {
    this.counter++;
    // this.obstacles.forEach((obstacle) => obstacle.move());
    this.player.move();

    if (this.counter % 60 === 0) {
      this.spawnObstacle();
    }
    if (this.counter % 100 === 0) {
      this.spawnTarget();
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      const currentObstacle = this.obstacles[i];
      currentObstacle.move();

      if (currentObstacle.x + currentObstacle.width < 0) {
        this.obstacles.splice(i, 1);
        currentObstacle.element.remove();
        this.spawnObstacle();
        i--;
      }

      const didCollide = this.player.didCollide(currentObstacle);
      console.log("did it collide", didCollide);

      if (didCollide) {
        this.obstacles.splice(i, 1);
        currentObstacle.element.remove();
        this.lives--;
        this.livesElement.innerText = this.lives;
        this.nazgul.volume = 0.2;
        this.nazgul.play();
      }
    }

    for (let i = 0; i < this.targets.length; i++) {
      const currentTarget = this.targets[i];
      currentTarget.move();

      if (currentTarget.x + currentTarget.width < 0) {
        this.targets.splice(i, 1);
        currentTarget.element.remove();
        this.spawnTarget();
        i--;
      }

      const didCollideWithTarget = this.player.didCollide(currentTarget);
      console.log("did it collide with target", didCollideWithTarget);

      if (didCollideWithTarget) {
        this.targets.splice(i, 1);
        currentTarget.element.remove();
        this.score += 1;
        this.scoreElement.innerText = this.score;
        this.orcSound.volume = 0.2;
        this.orcSound.play();
      }
    }

    if (this.lives === 0) {
      console.log("you died, you lost all your lives");
      this.endGame();
    }
  }

  spawnObstacle() {
    let newObstacle;
    let positionValid = false;
    let attempts = 0;

    while (!positionValid && attempts < 100) {
      newObstacle = new Obstacle();
      positionValid = true;

      for (const existingObstacle of this.obstacles) {
        if (this.checkCollision(newObstacle, existingObstacle)) {
          positionValid = false;
          break;
        }
      }

      attempts++;
    }

    if (positionValid) {
      this.obstacles.push(newObstacle);
    } else {
      console.warn("Could not find a valid position for a new target");
    }
  }

  spawnTarget() {
    let newTarget;
    let positionValid = false;
    let attempts = 0;

    while (!positionValid && attempts < 100) {
      newTarget = new Target();
      positionValid = true;

      for (const existingTarget of this.targets) {
        if (this.checkCollision(newTarget, existingTarget)) {
          positionValid = false;
          break;
        }
      }

      attempts++;
    }
    if (positionValid) {
      this.targets.push(newTarget);
    } else {
      console.warn("Could not find a valid position for a new target");
    }
  }

  endGame() {
    this.gameIsOver = true;

    mainSong.pause();
    mainSong.currentTime = 0;

    this.player.element.remove();
    this.obstacles.forEach((oneObstacle) => {
      oneObstacle.element.remove();
    });

    this.gameScreen.style.display = "none";
    this.endScreen.style.display = "block";
    this.finalScoreElement.innerText = this.score;
    this.urukHaiSong.volume = 0.2;
    this.urukHaiSong.play();

    this.finalScoreElement.innerText = this.score;
  }
}

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let game;

function updateHighScores(newScore, playerName) {
  highScores.push({ name: playerName, score: newScore });
  highScores = highScores.sort((a, b) => b.score - a.score).slice(0, 3);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  displayHighScores();
}

function displayHighScores() {
  const introTableBody = document.querySelector("#high-scores-intro tbody");
  const endTableBody = document.querySelector("#high-scores-end tbody");
  introTableBody.innerHTML = "";
  endTableBody.innerHTML = "";
  highScores.forEach((scoreEntry, index) => {
    const row = `<tr><td>${index + 1}</td><td>${scoreEntry.name}</td><td>${
      scoreEntry.score
    }</td></tr>`;
    introTableBody.innerHTML += row;
    endTableBody.innerHTML += row;
  });
}

document
  .querySelector("#submit-score-button")
  .addEventListener("click", function () {
    const playerName = document.querySelector("#player-name").value;
    if (playerName === "") {
      alert("Please enter your name to register your score.");
      return;
    }
    if (game) {
      updateHighScores(game.score, playerName);
    } else {
      console.log("Game instance not found");
    }
    document.querySelector("#player-name").value = "";
  });

displayHighScores();
