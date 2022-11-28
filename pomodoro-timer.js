let workTime = 1; 
let breakTime = 5;
let minutesLeft = workTime;
let secondsLeft = 0;
let state = "work";
let session;
let isActive = false;
let timeScreenLeft;

let playButton = document.querySelector("#play");
playButton.addEventListener("click", playButtonClick);

let resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", reset);

let timertStatus = document.querySelector("#status");
let pomodoroStateLbl = document.querySelector("#title");

// czy da się zrobić tak, aby zmiana wartości zmiennej wyzwalała event a tym samym event aktualizował by różne miejsca z tą wartością? coś jak c# i INotifyPropertyChanged

let timer;

updateTimeLeft();

function playButtonClick() 
{
    if (!isActive)
    {
        timer = setInterval(() => startPomodoroTimer(), 1000)
        isActive = true;
        playButton.innerHTML = "pause"
        timertStatus.innerHTML = "Minutes left";
    }
    else 
    {
        clearInterval(timer);
        isActive = false;
        playButton.innerHTML = "play_arrow"
        timertStatus.innerHTML = "Pause";
    }
}

function startPomodoroTimer()
{
    if(secondsLeft == 0)
    {
        minutesLeft--;
        secondsLeft = 60;
    }

    secondsLeft--;

    updateTimeLeft();

    if (minutesLeft == 0 && secondsLeft == 0) changeState();
}

function updateTimeLeft()
{
    if(minutesLeft < 10 && secondsLeft < 10 ) timeScreenLeft = "0" + minutesLeft + ":" + "0" + secondsLeft;
    else if(minutesLeft < 10) timeScreenLeft = "0" + minutesLeft + ":" + secondsLeft;
    else if (secondsLeft < 10) timeScreenLeft = minutesLeft + ":" + "0" + secondsLeft;
    else timeScreenLeft = minutesLeft + ":" + secondsLeft;

    document.querySelector("#time-left").innerHTML = timeScreenLeft;
}

function changeState()
{
    clearInterval(timer);

    if(state == "work")
    {
        state = "break";
        minutesLeft = breakTime;
        pomodoroStateLbl.innerHTML = "BREAK TIME";
    }
    else if (state == "break")
    {
        state = "work";
        minutesLeft = workTime;
        pomodoroStateLbl.innerHTML = "FOCUS TIME";

    }

    updateTimeLeft();
}

function reset()
{
    clearInterval(timer);
    pomodoroStateLbl.innerHTML = "FOCUS TIME";
    minutesLeft = workTime;
    secondsLeft = 0;
    updateTimeLeft();
}