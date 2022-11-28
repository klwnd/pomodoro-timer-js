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

