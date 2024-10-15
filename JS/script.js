window.onload = function () {
  const startButtom = document.getElementById("start-button");

  let myGame;

  startButtom.addEventListener("click", function () {
    startGame();
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      myGame.player.directionX = 3;
    }
    if (event.code === "ArrowLeft") {
      myGame.player.directionX = -3;
    }
    if (event.code === "ArrowUp") {
      myGame.player.directionY = -3;
    }
    if (event.code === "ArrowDown") {
      myGame.player.directionY = 3;
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
