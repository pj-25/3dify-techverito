import "./styles.css";
import HomeScene from "./homeScene/HomeScene";


let viewportCanvas = document.getElementById("viewport");
let homeScene = new HomeScene(viewportCanvas);

homeScene.initObjects();

homeScene.render();
