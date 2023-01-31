"use strict";

const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const replayBtn = document.querySelector('.replay-btn');
const timer = document.querySelector('.timer');
const countNumber = document.querySelector('.count');
const gameField = document.querySelector('.game-field');
const fieldRect = gameField.getBoundingClientRect();
const lost = document.querySelector('.lost-popup');
const won = document.querySelector('.won-popup');
const replay = document.querySelector('.replay-popup');

const CARROT_SIZE = 80;

const bgm = new Audio();

function gameStart() {
    addItem('carrot', 10, 'img/carrot.png')
    addItem('bug', 10, 'img/bug.png')

    stopBtn.style.display = 'block';
    countNumber.innerText = 10;
    
    limitTimer();

    bgm.src = 'sound/bg.mp3';
    bgm.play()
}

let count = 10;
let stopTimer;

function limitTimer() {
    stopTimer = setInterval(() => {
            console.log(count);
            count --;
            if(count <= 0){
                lost.style.display = 'block';
                clearInterval(stopTimer);

                const audioTimeOver = new Audio();
                audioTimeOver.src = 'sound/bug_pull.mp3'
                audioTimeOver.play()
                bgm.pause()
            } 
            timer.innerText = `0:${count}`
    },1000)
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

function gameStop(){
    clearInterval(stopTimer)
    replay.style.display = 'block'

    const audioReplay = new Audio()
    audioReplay.src = 'sound/alert.wav'
    audioReplay.play()
    bgm.pause()
}

let score = 10;

gameField.addEventListener('click', (e) => {
    const target = e.target;
    if (target.className == 'carrot') {
        score--;
        console.log(score);
        countNumber.innerText = score;
        target.remove()
        if(score === 0){
            won.style.display = 'block';
            clearInterval(stopTimer)

            const audioWon = new Audio();
            audioWon.src = 'sound/game_win.mp3'
            audioWon.play()
            bgm.pause()
        }
        
        const audioCarrot = new Audio();
        audioCarrot.src = 'sound/carrot_pull.mp3'
        audioCarrot.play()
    } else if(target.className == 'bug'){
        lost.style.display = 'block';
        clearInterval(stopTimer)

        const audioLost = new Audio();
        audioLost.src = 'sound/bug_pull.mp3'
        audioLost.play()
        bgm.pause()
    }
})

startBtn.addEventListener('click', gameStart)
stopBtn.addEventListener('click', gameStop)

