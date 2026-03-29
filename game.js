// game js 
import {loadScene} from "./sceneManager.js"
import { initPlayerSystem } from "./playersystem.js";

document.addEventListener("DOMContentLoaded", () => {
  initPlayerSystem();
});

function startgame(){
    const startBtn = document.getElementById("startBtn")
    if(startBtn){
        startBtn.addEventListener("click", () =>{
            loadScene("lobby")
        })
    }
}

// Här kan du använda getPlayerInfo() när spelet startar

document.addEventListener("DOMContentLoaded",startgame)