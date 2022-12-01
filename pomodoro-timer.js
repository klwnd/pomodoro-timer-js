let workTime = 1; 
let breakTime = 1;
let longBreakTime = 1;
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

let settingsButton = document.querySelector("#settings");
settingsButton.addEventListener("click", showSettingsBox);

let stateDiv = document.querySelector("#title");

let windowBg = document.querySelector(".main");

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

   if(state == "setup")
   {
    changeState();
   }
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
        secondsLeft = 3;
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
    stateDiv.innerHTML = "Pomodoro Timer";
    windowBg.classList.remove("break-bg");
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
            windowBg.classList.toggle("break-bg");
            if(session == 4)
            {
                setLongBreak();
                stateDiv.innerHTML = "Long break time";
            }
            else
            {
                state = "break";
                minutesLeft = breakTime;
                stateDiv.innerHTML = "Rest now";
            }
            break;
        case "break":
            pomodoroTimerTickStop();
            state = "work";
            minutesLeft = workTime;
            windowBg.classList.toggle("break-bg");
            stateDiv.innerHTML = "Stay Focus Now";
            modifySessionNumber();
            break;
        case "longBreak":
            pomodoroReset();
            console.log("longBreakEnd");
            break;
        case "setup":
            state = "work"
            minutesLeft = workTime;
            modifySessionNumber();
            stateDiv.innerHTML = "Stay Focus Now";
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

function setLongBreak()
{
    state = "longBreak";
    minutesLeft = longBreakTime;
    console.log("longBreakStart"); 
}

function showSettingsBox()
{
    document.querySelector("#settingsBox").classList.toggle("show-hide-settings-box");
}

