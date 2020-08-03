const body = document.querySelector('body');
const startButton = document.querySelector('#startbutton');
const firstTony = document.querySelector('#maintony');
const score = document.querySelector('#score');
const timer = document.querySelector('#timer');
let gameInt;
let tonyCounter = 0;
const width = window.innerWidth;
const height = window.innerHeight;

const tonyPics = ["images/tony0.png","images/tony1.png","images/tony2.png"]
let gameScore = 0;

//tony mole object that creates HTML element in DOM
//functions to display and delete itself
class tonyMole {
    constructor(){
        this.imageSrc = tonyPics[Math.floor(Math.random() * tonyPics.length)];
        this.xPos = Math.floor((0.1 + 0.8 * Math.random()) * width);
        this.yPos = Math.floor((0.1 + 0.8* Math.random()) * height);
        this.imgElement = document.createElement("img");
        this.imgElement.src = this.imageSrc;
        this.imgElement.className = "mole";
        this.id = tonyCounter;
        this.imgElement.id = tonyCounter;
        tonyCounter++;
        this.imgElement.style.right = this.xPos + "px";
        this.imgElement.style.top = this.yPos + "px";
        this.imgElement.onclick = this.gotWhacked;
        console.log(typeof(this.imgElement));
    }
    display = () => {
        body.appendChild(this.imgElement);
    }
    delete = () => {
        document.getElementById(this.id).remove();
    }
    gotWhacked = () => {
        gameScore += 10;
        this.delete();
    }
}

//starts game timer
const startGame = () => {
    startButton.remove();
    firstTony.remove();
    let dateObj = new Date();
    startTime = dateObj.getTime()
    timerInt = setInterval(() => {
        updateTime(startTime);
    }, 1000);
    scoreUpdateInt = setInterval(() => {
        score.innerHTML = gameScore;
    }, 50)
}

//ends the game by stopping the timer
const endGame = () => {
    clearInterval(timerInt);
    clearInterval(scoreUpdateInt);
    document.querySelectorAll(".mole").forEach(tony => tony.delete());
}

//updates time inside Timer
//{number} startTime: start unix time in milliseconds 
const updateTime = (startTime) => {
    let d = new Date();
    timeLeft = 30 - Math.round((d.getTime() - startTime) / 1000)
    timer.innerHTML = timeLeft + "s";
    if (timeLeft < 1){
        endGame()
    }
    let newMole = new tonyMole;
    newMole.display();
}

startButton.onclick = startGame;