let questions = Array.from(document.querySelectorAll(".questions"))
let currentQuestion = 0

function showTimerInfo(){
    alert(
` Tips!

Du kan aktivera en tidsbegränsning i spelet.

Klicka på klockan uppe i hörnet (⏱) för att:
• Sätta en timer
• Stänga av timern

Perfekt om du vill göra spelet mer utmanande! `
    )
}

let score = 0
const scoreDisplay = document.getElementById("scoreValue")

let correctFound = 0
let totalCorrect = 0

let timerEnable = false
let timerSeconds = 180
let initialTimerSeconds = 0
let timerInterval = null
let gameFinished = false

// UI
const nextbtn = document.querySelector(".nextbtn")
const timerbox = document.getElementById("timerBox")
const timerDisplay = document.getElementById("timer")
const restartBtn = document.querySelector(".restart")
const endBtn = document.querySelector(".end")
const xpPopup = document.getElementById("xpPopup")
const gameOverScreen = document.getElementById("gameOverScreen")
const finalScore = document.getElementById("finalScore")
const RestartGameoverscene = document.getElementById("restartGameoverscene")


// Shuffle frågor
function randomQuize(){
    questions = questions.sort(() => Math.random() - 0.5)
}

// Visa fråga
function showQuiz(){
    questions.forEach(q => q.style.display = "none")
    
    const current = questions[currentQuestion]
    current.style.display = "flex"

    correctFound = 0
    totalCorrect = current.querySelectorAll('[data-correct="true"]').length
    
    const buttons = current.querySelectorAll("button.svar")
    buttons.forEach(btn=>{
        btn.disabled = false
        btn.style.background = ""
    })

    nextbtn.disabled = true
}

// Nästa fråga
function nextQuiz(){
    currentQuestion++

    if(currentQuestion >= questions.length){
        endgame()
        return
    }

    showQuiz()
}

// hantering av spelet, svar visning med färjer 
document.querySelectorAll("button.svar").forEach(btn =>{

    btn.addEventListener("click", ()=>{

        if(gameFinished) return 

        const parent = btn.closest(".questions")
        const buttons = parent.querySelectorAll(".svar")

        if(btn.dataset.correct === "true"){

            btn.style.background = "#22c55e"
            btn.disabled = true
            addScore()
            correctFound++

            if(correctFound === totalCorrect){

                buttons.forEach(b => b.disabled = true)

                if(timerEnable){
                    setTimeout(nextQuiz,800)
                }else{
                    nextbtn.disabled = false
                }
            }

        }else{

            btn.style.background = "#ef4444"

            buttons.forEach(b =>{
                if(b.dataset.correct === "true"){
                    b.style.background = "#3b82f6"
                }
                b.disabled = true
            })

            if(timerEnable){
                setTimeout(nextQuiz,1200)
            }else{
                nextbtn.disabled = false
            }
        }
    })
})

// Score add
function addScore(){
    score += 10
    scoreDisplay.textContent = score
    showXP(10)
}

// XP popup
function showXP(amount){
    xpPopup.textContent = "+" + amount + " XP"
    xpPopup.classList.add("xpShow")
    
    setTimeout(()=>{
        xpPopup.classList.remove("xpShow")
    },1000)
}

// Next knapp
nextbtn.addEventListener("click", ()=>{
    nextbtn.disabled = true
    nextQuiz()
})

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

    questions.forEach(q => q.style.display = "none") 

    finalScore.textContent = "Total XP: " + score 
    progressQ.textContent = (currentQuestion + 1) + " / " + questions.length

    gameOverScreen.style.display = "flex"  
}

restartBtn.addEventListener("click", restartGame)
RestartGameoverscene.addEventListener("click", restartGame)
endBtn.addEventListener("click", endgame)

import { loadScene } from "./sceneManager.js"

document.addEventListener("click", (e)=>{
    if(e.target.id === "gaback"){
        console.log("CLICK FUNKAR")
        loadScene("lobby")
    }
})

randomQuize()
showQuiz()
showTimerInfo()

