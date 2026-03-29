import { loadScene } from "./sceneManager.js"
import { getPlayerInfo } from "./playersystem.js";



function showTimerInfo(){
    alert(
` Tips!

Du kan aktivera en tidsbegränsning i spelet.

Klicka på klockan uppe i hörnet (⏱) för att:
• Sätta en timer
• Stänga av timern

Perfekt om du vill göra spelet mer utmanande!`
    )
}

const { avatar } = getPlayerInfo();
const avatarDiv = document.querySelector(".playerBinfo.avatar");

if (avatar && avatarDiv) {
    avatarDiv.style.backgroundImage = `url(${avatar})`;
    avatarDiv.style.backgroundSize = "cover";
    avatarDiv.style.backgroundPosition = "center";
}

let cards = Array.from(document.querySelectorAll(".cards"))
const scoreDisplay = document.getElementById("scoreValue")

let score = 0
let currentCard = 0
let correct = 0
let gameFinished = false
let timerEnable = false
let timerSeconds = 180
let initialTimerSeconds = 0
let timerInterval = null

const restartBtn = document.querySelector(".restart")
const endBtn = document.querySelector(".end")
const xpPopup = document.getElementById("xpPopup")
const timerbox = document.getElementById("timerBox")
const timerDisplay = document.getElementById("timer")
const gameOverScreen = document.getElementById("gameOverScreen")
const finalScore = document.getElementById("finalScore")
const RestartGameoverscene = document.getElementById("restartGameoverscene")


// randominersera kort

function randomcards(){
    cards = cards.sort(()=> Math.random() -0.5)
}

// visa kort 
function showCard(){
    cards.forEach( c=> c.style.display = "none")
    const current = cards[currentCard]
    current.style.display = "flex"

    correct = current.querySelectorAll('[data-correct="true"]').length
    const buttons = current.querySelectorAll(".answerbtn")
    buttons.forEach(btn=>{
        btn.disabled = false
        btn.style.background = ""
    })
}

// nästa kort 
function nextCard(){
    currentCard++

    if(currentCard >= cards.length){
        endgame()
        return
    }

    showCard()
}

// funktione för att tilläga svaren med färg, och själva spelet körning [Main metod]

document.querySelectorAll("button.answerbtn").forEach(ans =>{
    ans.addEventListener("click", ()=>{

        if(gameFinished) 
            return

        const parent = ans.closest(".cards")
        const answers = parent.querySelectorAll(".answerbtn")

        if(ans.dataset.correct === "true"){
            ans.style.background = "#22c55e"
            ans.disabled = true
            addScore()
        }
        else{

            ans.style.background = "#ef4444"

            answers.forEach(b =>{
                if(b.dataset.correct === "true"){
                    b.style.background = "#3b82f6"
                }
            })
        }

        answers.forEach(b => b.disabled = true)

        setTimeout(nextCard,800)
    })
})

// Score add
function addScore(){
    score += 5
    scoreDisplay.textContent = score
    showXP(5)
}

// XP popup
function showXP(amount){
    xpPopup.textContent = "+" + amount + " XP"
    xpPopup.classList.add("xpShow")
    
    setTimeout(()=>{
        xpPopup.classList.remove("xpShow")
    },1000)
}

// Timer
function startTimer(){
    clearInterval(timerInterval)

    timerInterval = setInterval(()=>{

        if(gameFinished){
            clearInterval(timerInterval)
            return
        }

        timerSeconds--

        let minutes = Math.floor(timerSeconds/60)
        let seconds = timerSeconds % 60

        timerDisplay.textContent =
        `${minutes}:${seconds < 10 ? "0":""}${seconds}`

        if(timerSeconds <= 0){
            clearInterval(timerInterval)
            endgame()
        }

    },1000)
}

timerbox.addEventListener("click", ()=>{
    const choice = prompt(
    `Timer settings
    1 = Set time
    2 = Turn off timer`
    )

    if(choice === "1"){
        const minutes = prompt("Enter minutes: ")

        if(!isNaN(minutes) && minutes > 0){
            initialTimerSeconds = minutes * 60
            timerSeconds = initialTimerSeconds
            timerEnable = true

            let m = Math.floor(timerSeconds/60)
            let s = timerSeconds % 60

            timerDisplay.textContent =
            `${m}:${s < 10 ? "0":""}${s}`

            startTimer()
        }
    }

    if(choice === "2"){
        timerEnable = false
        clearInterval(timerInterval)
        timerDisplay.textContent = "OFF"
    }
})


function restartGame(){
    window.location.reload()
}


function endgame(){
    if(gameFinished) return

    gameFinished = true
    clearInterval(timerInterval)

    cards.forEach( c=> c.style.display = "none")

    finalScore.textContent = "Total XP: " + score 

    gameOverScreen.style.display = "flex"  
}

if(restartBtn){
    restartBtn.addEventListener("click", restartGame)
}

if(RestartGameoverscene){
    RestartGameoverscene.addEventListener("click", restartGame)
}

if(endBtn){
    endBtn.addEventListener("click", endgame)
}


document.addEventListener("click", (e)=>{
    if(e.target.id === "gaback"){
        console.log("CLICK FUNKAR")
        loadScene("lobby")
    }
})


randomcards()
showCard()
showTimerInfo()