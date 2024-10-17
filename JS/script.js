const mainSong = new Audio("../Audio/Rohan Theme.mp3");

window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const soundButton = document.getElementById("sound-button");

  let myGame;

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", () => {
    window.location.reload();
  });

  soundButton.addEventListener("click", () => {
    mainSong.play();
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      myGame.player.directionX = 3;
    }
    if (event.code === "ArrowLeft") {
      myGame.player.directionX = -1;
    }
    if (event.code === "ArrowUp") {
      myGame.player.directionY = -2;
    }
    if (event.code === "ArrowDown") {
      myGame.player.directionY = 2;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowRight") {
      myGame.player.directionX = 0;
    }
    if (event.code === "ArrowLeft") {
      myGame.player.directionX = 0;
    }
    if (event.code === "ArrowUp") {
      myGame.player.directionY = 0;
    }
    if (event.code === "ArrowDown") {
      myGame.player.directionY = 0;
    }
  });

  function startGame() {
    console.log("Start the game");

    myGame = new Game();

    myGame.start();
  }
};
