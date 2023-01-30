"use strict";

const startBtn = document.querySelector('.start-btn');
const timer = document.querySelector('.timer');
const countNumber = document.querySelector('.count');
const gameField = document.querySelector('.game-field');
const fieldRect = gameField.getBoundingClientRect();
const lost = document.querySelector('.lost-popup');

const CARROT_SIZE = 80;

function gameStart() {
    addItem('carrot', 10, 'img/carrot.png')
    addItem('bug', 10, 'img/bug.png')

    startBtn.innerHTML = '<i class="fas fa-solid fa-square"></i>';
    countNumber.innerText = 10;

    let count = 10;
    const limitTimer = setInterval(() => {
        count --;
        if(count <= 0){
            lost.style.display = 'block';
            clearInterval(limitTimer)
        } 
        timer.innerText = `0:${count}`
    }, 1000);

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


startBtn.addEventListener('click', gameStart)




