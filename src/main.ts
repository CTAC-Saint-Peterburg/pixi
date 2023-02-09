import "./style.css";
import * as PIXI from "pixi.js";
import textureOne from "./assets/back.png";
import textureTwo from "./assets/front.png";
import textureThree from "./assets/dollar.png";
import textureFour from "./assets/euro.png";
import textureFive from "./assets/pound.png";

const canvasSize: { width: number; height: number } = {
  width: 1000,
  height: 600,
};

const textureData: string[] = [
  textureOne,
  textureTwo,
  textureThree,
  textureFour,
  textureFive,
];
console.log(PIXI, "пакет подключился");
const app = new PIXI.Application({
  width: canvasSize.width,
  height: canvasSize.height,
  background: "#c5f4e0",
});

document.body.appendChild(app.view);

const textureStorage = [];
for (let i: number = 0; i < 5; i++) {
  const texture = PIXI.Texture.from(textureData[i]);
  textureStorage.push(texture);
}
const coins = new PIXI.AnimatedSprite(textureStorage);

coins.anchor.set(0.5);
coins.x = app.screen.width / 2;
coins.y = app.screen.height / 2;
coins.width = 1;
coins.height = 1;
coins.animationSpeed = 0.1;
coins.gotoAndPlay(2);
app.stage.addChild(coins);
app.start();

app.ticker.add(() => {
  coins.rotation += 0.02;
});

const fullText = new PIXI.Text("нажмите на монету");
fullText.x = app.screen.width / 2 - 120;
fullText.y = app.screen.height / 2 - 230;
app.stage.addChild(fullText);

const container = new PIXI.Container();

coins.interactive = true;

let fullScreen: boolean = false;
coins.on("pointertap", () => {
  if (!fullScreen) {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    coins.x = app.screen.width / 2;
    coins.y = app.screen.height / 2;
    fullText.x = app.screen.width / 2 - 120;
    fullText.y = app.screen.height / 2 - 230;
    fullScreen = !fullScreen;
  } else if (fullScreen) {
    app.renderer.resize(canvasSize.width, canvasSize.height);
    coins.x = app.screen.width / 2;
    coins.y = app.screen.height / 2;
    fullText.x = app.screen.width / 2 - 120;
    fullText.y = app.screen.height / 2 - 230;
    fullScreen = !fullScreen;
  }
});

app.stage.addChild(container);
