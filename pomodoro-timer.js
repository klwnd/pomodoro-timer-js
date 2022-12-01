let workTime = 30; 
let breakTime = 5;
let longBreakTime = 30;
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

let appTitle = document.querySelector("title");

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
    if(state == "work")
    {
        appTitle.innerText = pomodoroTimeLeft + " - Focus Time";
    }
    else if (state == "break" || state == "longBreak")
    {
        appTitle.innerText = pomodoroTimeLeft + " - Break Time";
    }
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
    stateDiv.innerHTML = "Pomodoro Timer";
    appTitle.innerText = "Let's begin work with Pomodoro!";
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
}

function showSettingsBox()
{
    document.querySelector("#settingsBox").classList.toggle("show-hide-settings-box");

    let sWorkTime = document.querySelector(".settings-box form #sWorkTime");
    let sBreakTime = document.querySelector(".settings-box form #sBreakTime");
    let sLongBreakTime = document.querySelector(".settings-box form #sLongBreakTime");

    sWorkTime.onchange = function() {
        workTime = this.options[this.selectedIndex].value;
        pomodoroReset();
    };

    sBreakTime.onchange = function() {
        breakTime = this.options[this.selectedIndex].value;
        pomodoroReset();
    };

    sLongBreakTime.onchange = function() {
        longBreakTime = this.options[this.selectedIndex].value;
        pomodoroReset();
    };
    
    updateValueInSettingsBox(sWorkTime, sBreakTime, sLongBreakTime);
}

function updateValueInSettingsBox(sWorkTime, sBreakTime, sLongBreakTime)
{
    Array.from(sWorkTime.options).find(item => item.value == workTime).selected = true;
    Array.from(sBreakTime.options).find(item => item.value == breakTime).selected = true;
    Array.from(sLongBreakTime.options).find(item => item.value == longBreakTime).selected = true;
}