const left = document.getElementById("leftArrow");
const right = document.getElementById("rightArrow");
const logoButton = document.getElementById("logoButton");

left.addEventListener("click", leftUpdater);
right.addEventListener("click", rightUpdater);
logoButton.addEventListener("click", startTimer);

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

const time = document.getElementById("time");


let mins = Number(time.textContent.split(":")[0]);
let secs = Number(time.textContent.split(":")[1]);

if (localStorage.getItem("prodTime") === null) {
    let date = new Date().getDate();
    let prodArr = ["0", {date}];
    let prodStr = JSON.stringify(prodArr);
    localStorage.setItem("prodTime", prodStr);
}

let dateToday = new Date().getDate();
if (dateToday != getDate()) {
    prodTimeStr = JSON.stringify(["0", {dateToday}]);
    localStorage.setItem("prodTime", prodTimeStr);
}

if (localStorage.getItem("mins") != 0 || localStorage.getItem("secs") != 0) {
    let timeMins = Number(localStorage.getItem("timerMins"));
    let timeSecs = Number(localStorage.getItem("timerSecs"));
    let currTime = new Date().getTime();
    let distance = currTime - dateToday;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // let minsLeft = 

    const interval = setInterval(function() { timer(currTime, startMins, interval); });
    // const 
    
    interval = setInterval(function() { timer(startingTime, startMins, interval); });
}

// also need to do sth if the above values are 0

function getDate() {
    let prodStrs = (localStorage.getItem("prodTime"));
    let prodParsed = JSON.parse(prodStrs);
    let date = prodParsed[1].date;
    return date;
}

function getProdTime() {
    let prodStrs = (localStorage.getItem("prodTime"));
    let prodParsed = JSON.parse(prodStrs);
    let prod = Number(prodParsed[0]);
    return prod;
}

let prodStrs = (localStorage.getItem("prodTime"));
let prodParsed = JSON.parse(prodStrs);
let prod = Number(prodParsed[0]);
document.getElementById("output").innerHTML = `You have been productive for ${getProdTime()} minutes today`

function startTimer () {
    const startMins = mins;
    const startSecs = secs;
    let startingTime = new Date().getTime();
    hideArrows();
    const interval = setInterval(function() { timer(startingTime, startMins, startSecs, interval); });
}

function hideArrows() {
    left.style.display = 'none';
    right.style.display = 'none';
}

window.onbeforeunload = timer;

function timer(startTime, startMins, startSecs, intervalVar) {
    let currTime = new Date().getTime();
    let distance = currTime - startTime;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const timerMins = mins - minutes - 1;
    localStorage.setItem("mins", timerMins);
    const timerSecs = secs - seconds + 59;
    localStorage.setItem("secs", timerSecs);
    localStorage.setItem("date", currTime);
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
    let currProd = getProdTime();
    let timey = currProd + prodTime;
    let date = new Date().getDate();
    let prodArr = [`${timey}`, {date}];
    let prodStr = JSON.stringify(prodArr);
    localStorage.setItem("prodTime", prodStr);
    prodHours = Math.floor(timey / 60);
    prodMins = timey - (prodHours * 60);
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