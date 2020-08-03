const body = document.querySelector('body');
const startButton = document.querySelector('#startbutton');
const firstTony = document.querySelector('#maintony');
const score = document.querySelector('#score');
const timer = document.querySelector('#timer');
let gameInt;
const width = window.innerWidth;
const height = window.innerHeight;

const tonyPics = ["images/tony0.png","images/tony1.png","images/tony2.png"]
let aliveTonies = [];

//tony mole object that creates HTML element in DOM
//functions to display and delete itself
class tonyMole {
    constructor(){
        this.imageSrc = tonyPics[Math.floor(Math.random() * tonyPics.length)];
        this.xPos = Math.floor(Math.random() * width);
        this.yPos = Math.floor((0.1 + 0.8* Math.random()) * height);
        this.imgElement = document.createElement("img");
        this.imgElement.src = this.imageSrc;
        this.imgElement.id = "tonymole";
        this.imgElement.style.position = "absolute";
        this.imgElement.style.right = this.xPos + "px"
        this.imgElement.style.top = this.yPos + "px"
        aliveTonies.push(this);
    }
    display(){
        body.appendChild(this.imgElement);
    }
    delete(){
        body.removeChild(this.imgElement);
        delete(this);
    }
    
}

//starts game timer
const startGame = () => {
    startButton.remove();
    firstTony.remove();
    let dateObj = new Date();
    startTime = dateObj.getTime()
    gameInt = setInterval(() => {
        updateTime(startTime);
    }, 1000);
}

//ends the game by stopping the timer
const endGame = () => {
    clearInterval(gameInt);
    aliveTonies.forEach(tony => tony.delete());
}

//updates time inside Timer
//{number} startTime: start unix time in milliseconds 
const updateTime = (startTime) => {
    let d = new Date();
    timeLeft = 60 - Math.round((d.getTime() - startTime) / 1000)
    timer.innerHTML = timeLeft + "s";
    if (timeLeft < 1){
        endGame()
    }
    let newMole = new tonyMole;
    newMole.display();
}

startButton.onclick = startGame;