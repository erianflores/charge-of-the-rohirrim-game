window.onload = function () {
  const startButtom = document.getElementById("start-button");

  let myGame;

  startButtom.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("Start the game");

    myGame = new Game();

    myGame.start();
  }
};
