// menuScene.js
import { loadScene } from "./sceneManager.js";

export function initMenu(){
    const quizbtn = document.querySelector(".quiz")
    const battlebtn = document.querySelector(".elementB")
    const backbtn = document.querySelector(".backbtn")
    // const multiserver = document.querySelector("")


    if(quizbtn){
        quizbtn.addEventListener("click", ()=> {
            loadScene("quiz")
     })
    }

    if(battlebtn){
        battlebtn.addEventListener("click", ()=>{
            loadScene("battle")
    })
    }

    if(backbtn){
        backbtn.addEventListener("click", ()=>{
            window.location.href = "index.html"
    })
    }
}

