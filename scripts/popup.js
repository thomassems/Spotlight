const left = document.getElementById("leftArrow");
const right = document.getElementById("rightArrow");
const time = document.getElementById("time");
const logoButton = document.getElementById("logoButton");
let mins = Number(time.textContent.split(":")[0]);
let secs = Number(time.textContent.split(":")[1]);
let productiveTime = 0;

if (localStorage.getItem("prodTime") === null) {
    localStorage.setItem("prodTime", "0")
}

if (localStorage.getItem("mins") != 0 || localStorage.getItem("secs") != 0) {

}

left.addEventListener("click", leftUpdater);
right.addEventListener("click", rightUpdater);
logoButton.addEventListener("click", startTimer);
let prod = Number(localStorage.getItem('prodTime'));
document.getElementById("output").innerHTML = `You have been productive for ${prod} minutes today`

function leftUpdater() {
    if (time.textContent != "1:00") {
        mins -= 1;
        time.innerHTML = `${mins}:00`;
        right.style.opacity = "100%";
    }
    if (mins === 5) {
        left.style.opacity = "50%";
    }
}

function rightUpdater() {
    if (time.textContent != "120:00") {
        time.innerHTML = `${mins + 5}:00`;
        mins += 5;
        left.style.opacity = "100%";
    }
    if (mins === 120) {
        right.style.opacity = "50%";
    }
}

function startTimer () {
    const startMins = mins;
    let startingTime = new Date().getTime();
    hideArrows();
    const interval = setInterval(function() { timer(startingTime, startMins, interval); });
}

function hideArrows() {
    left.style.display = 'none';
    right.style.display = 'none';
}

window.onbeforeunload = timer;

function timer(startTime, startMins, intervalVar) {
    let currTime = new Date().getTime();
    let distance = currTime - startTime;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const timerMins = mins - minutes - 1;
    localStorage.setItem("mins", timerMins);
    const timerSecs = secs - seconds + 59;
    localStorage.setItem("secs", timerSecs);
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
        alert(`Congratulations on maintaining a productive streak for ${startMins} minutes! Keep up the great work!`);
        clearTimer(startMins, intervalVar);
        updateProductiveTime(startMins);
    }
}

function clearTimer(startMins, intervalVar) {
    time.innerHTML = `${startMins}:00`;
    displayArrows();
    clearInterval(intervalVar);
}

function updateProductiveTime(prodTime) {
    let outputs = document.getElementById("output");
    let currProd = Number(localStorage.getItem("prodTime"));
    let timey = currProd + prodTime;
    localStorage.setItem('prodTime', timey);
    prodHours = Math.floor(timey / 60);
    prodMins = productiveTime - (prodHours * 60);
    let textHours = "hours";
    if (prodHours === 1) {
        textHours = "hour";
    }

    if (prodHours > 0 && prodMins > 0) {
        outputs.innerHTML = `You have been productive for ${hours} ${textHours} and ${prodMins} minutes today`
    }
    else if (prodHours === 0) {
        outputs.innerHTML = `You have been productive for ${prodMins} minutes today`
    }
    else {
        outputs.innerHTML = `You have been productive for ${prodHours} ${textHours} today`
    }
}

function displayArrows() {
    right.style.display = 'inline';
    left.style.display = 'inline';
}

// extension should remain active as you flip tabs
// also need to use local storage to save some of the data
// need the time you have been productive for to clear every 24 hours
// use chrome local storage