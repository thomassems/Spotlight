const left = document.getElementById("leftArrow");
const time = document.getElementById("time");
const right = document.getElementById("rightArrow");
const logoButton = document.getElementById("logoButton");
let mins = Number(time.textContent.split(":")[0]);
let secs = Number(time.textContent.split(":")[1]);
left.addEventListener("click", leftUpdater);
right.addEventListener("click", rightUpdater);
logoButton.addEventListener("click", startTimer)

function leftUpdater() {
    if (time.textContent != "11:00") {
        time.innerHTML = `${mins - 1}:00`; // should be mins - 5, just changed it for testing purposes
        mins -= 1; // mins -= 5
    }
}

function rightUpdater() {
    if (time.textContent != "120:00") {
        time.innerHTML = `${mins + 5}:00`;
        mins += 5;
    }
}

function startTimer () {
    let startingTime = new Date().getTime();
    left.parentNode.removeChild(left);
    right.parentNode.removeChild(right);
    const interval = setInterval(function() { timer(startingTime, interval); });
}

function timer(startTime, intervalVar) {
    let currTime = new Date().getTime();
    let distance = currTime - startTime;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const timerMins = mins - minutes - 1;
    const timerSecs = secs - seconds + 59;
    if (timerSecs < 10) {
        time.innerHTML = `${timerMins}:0${timerSecs}`; 
    }
    else if (timerMins < 10) {
        time.innerHTML = `0${timerMins}:${timerSecs}`;
    }
    else {
        time.innerHTML = `${timerMins}:${timerSecs}`;
    }

    if (timerMins < 0) {
        clearTimer(mins, intervalVar);
    }
}

function clearTimer(mins, intervalVar) {
    time.innerHTML = `${mins}:${secs}`;
    let leftAr = document.createElement("button");
    let rightAr = document.createElement("button");
    leftAr.innerHTML = '&#8249';
    left.appendChild(leftAr);
    rightAr.innerHTML = '&#8250';
    right.appendChild(rightAr);
    clearInterval(intervalVar);
}

// when logo is clicked, the extension should be activated, and it should remain active as you flip tabs
// once the timer ends, should add a popup message saying congrats, and then when they click ok
// also add a 0 before the digits if they are less then 10
