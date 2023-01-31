"use strict";

const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const replayBtn = document.querySelector('.replay-btn');
const timer = document.querySelector('.timer');
const countNumber = document.querySelector('.count');
const gameField = document.querySelector('.game-field');
const fieldRect = gameField.getBoundingClientRect();
const popup = document.querySelector('.popup');
const gameResult = document.querySelector('.game-result');

const CARROT_SIZE = 80;

let count = 10;
let stopTimer;
let score = 10;

const bgm = new Audio('sound/bg.mp3');
const audioReplay = new Audio('sound/alert.wav');
const audioWon = new Audio('sound/game_win.mp3');
const audioCarrot = new Audio('sound/carrot_pull.mp3');
const audioBug = new Audio('sound/bug_pull.mp3');

startBtn.addEventListener('click', gameStart)
stopBtn.addEventListener('click', gameStop)
replayBtn.addEventListener('click', () => {
    score = 10;
    count = 10;
    timer.innerText = `0:${count}`
    gameStart()
    popup.style.display = 'none';
    gameScore()
    limitTimer()
})
gameField.addEventListener('click', gameScore)

function gameScore(e) {
    const target = e.target;
    if (target.className == 'carrot') {
        score--;
        console.log(score);
        countNumber.innerText = score;
        target.remove()
        if(score === 0){
            popup.style.display = 'block';
            clearInterval(stopTimer)
            playSound(audioWon)
            stopSound(bgm)
        }
        playSound(audioCarrot)
    } else if(target.className == 'bug'){
        popup.style.display = 'block';
        gameResult.innerText = 'YOU LOST🤦‍♀️';
        clearInterval(stopTimer)
        playSound(audioBug)
        stopSound(bgm)
    }
}

function gameStart() {
    gameInit()
    stopBtn.style.display = 'block';
    countNumber.innerText = 10;
    limitTimer();
    playSound(bgm)
}

function gameStop(){
    clearInterval(stopTimer)
    popup.style.display = 'block'
    gameResult.innerText = 'Replay❓';
    playSound(audioReplay)
    stopSound(bgm)
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play()
}

function stopSound(sound){
    sound.pause()
}

function limitTimer() {
    stopTimer = setInterval(() => {
            console.log(count);
            count --;
            if(count <= 0){
                popup.style.display = 'block';
                gameResult.innerText = 'YOU LOST🤦‍♀️';
                clearInterval(stopTimer);
                playSound(audioBug)
                stopSound(bgm)
            } 
            timer.innerText = `0:${count}`
    },1000)
}

function gameInit(){
    gameField.innerHTML = '';
    addItem('carrot', 10, 'img/carrot.png')
    addItem('bug', 10, 'img/bug.png')
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for(let i = 0; i < count; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomPosition(x1, x2);
        const y = randomPosition(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        gameField.appendChild(item);
    }
}

function randomPosition(min, max) {
    return Math.random() * (max - min) + min;
}





