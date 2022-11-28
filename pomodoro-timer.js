let workTime = 2; 
let breakTime = 1;
let minutesLeft = workTime;
let secondsLeft = 0;
let state = "setup";
let session = 0;
let isActive = false;
let pomodoroTimeLeft;

let playButton = document.querySelector("#play");
playButton.addEventListener("click", pomodoroStartPauseControl);

let resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", pomodoroReset);

let timerStatus = document.querySelector("#status");
let sessionCircleDiv = document.querySelectorAll(".session > .circle");

let timeLeftScreen = document.querySelector("#time-left");

let pomodoroTimer;

pomodoroPrepareTime();

function pomodoroStartPauseControl()
{
    if(!isActive)
    {
        pomodoroTimer = setInterval(pomodoroTimerTick, 1000);
        isActive = true;
        timerStatus.innerHTML = "Minutes left";
        playButton.innerHTML = "pause";
    }
    else 
    {
        pomodoroTimerTickStop()
        timerStatus.innerHTML = "Pause";
    }

   changeState();
}

function updateTimeOnScreen()
{
    timeLeftScreen.innerHTML = pomodoroTimeLeft;
}

function pomodoroTimerTick() 
{
    if(secondsLeft == 0)
    {
        minutesLeft--;
        secondsLeft = 60;
    }

    secondsLeft--;
    pomodoroPrepareTime();

    if (minutesLeft == 0 && secondsLeft == 0) changeState();
}

function pomodoroPrepareTime()
{
    if(minutesLeft < 10 && secondsLeft < 10 ) pomodoroTimeLeft = "0" + minutesLeft + ":" + "0" + secondsLeft;
    else if(minutesLeft < 10) pomodoroTimeLeft = "0" + minutesLeft + ":" + secondsLeft;
    else if (secondsLeft < 10) pomodoroTimeLeft = minutesLeft + ":" + "0" + secondsLeft;
    else pomodoroTimeLeft = minutesLeft + ":" + secondsLeft;

    updateTimeOnScreen();
}

function pomodoroTimerTickStop()
{
    clearInterval(pomodoroTimer);
    isActive = false;
    playButton.innerHTML = "play_arrow";
}

function pomodoroReset()
{
    pomodoroTimerTickStop();
    minutesLeft = workTime;
    secondsLeft = 0;
    state = "setup";
    session = 0;
    pomodoroPrepareTime();
    timerStatus.innerHTML = "Minutes left";
    for (let session of sessionCircleDiv)
    {
        session.classList.remove("done");
    }
}

function changeState()
{
    switch (state) 
    {
        case "work":
            pomodoroTimerTickStop();
            state = "break";
            minutesLeft = breakTime;
            break;
        case "break":
            pomodoroTimerTickStop();
            state = "work";
            minutesLeft = workTime;
            modifySessionNumber();
            break;
        case "setup":
            state = "work"
            minutesLeft = workTime;
            modifySessionNumber();
            break;
    }

    secondsLeft = 0;
    pomodoroPrepareTime();
}

function modifySessionNumber()
{
    session ++;
    sessionCircleDiv[session-1].classList.add("done");
}