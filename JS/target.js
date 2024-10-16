class Target {
  constructor() {
    this.gameScreen = document.querySelector("#game-screen");
    const minY = 50;
    const maxY = 550;
    this.top = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    this.left = 1000;
    this.width = 100;
    this.height = 80;
    this.element = document.createElement("img");
    this.element.style.position = "absolute";
    this.element.src = "../Images/Orc.png";
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.left -= 3;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }
}
