const left = document.getElementById("leftArrow");
const time = document.getElementById("time");
const right = document.getElementById("rightArrow");
const logoButton = document.getElementById("logoButton");
const leftArrContainer = document.getElementById("lArrow");
const rightArrContainer = document.getElementById("rArrow");
let mins = Number(time.textContent.split(":")[0]);
let secs = Number(time.textContent.split(":")[1]);
let productiveTime = 0;
left.addEventListener("click", leftUpdater);
right.addEventListener("click", rightUpdater);
logoButton.addEventListener("click", startTimer)

function leftUpdater() {
    if (time.textContent != "1:00") { // should be 5:00
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
    const startMins = mins;
    let startingTime = new Date().getTime();
    left.parentNode.removeChild(left);
    right.parentNode.removeChild(right);
    const interval = setInterval(function() { timer(startingTime, startMins, interval); });
}

function timer(startTime, startMins, intervalVar) {
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
        alert(`Congrats on being productive for ${startMins} minutes`);
        clearTimer(startMins, intervalVar);
        updateProductiveTime(startMins);
    }
}

function clearTimer(startMins, intervalVar) {
    time.innerHTML = `${startMins}:00`;
    let leftAr = document.createElement("button");
    leftAr.className = "arrows";
    let rightAr = document.createElement("button");
    rightAr.className = "arrows";
    leftAr.innerHTML = '&#8249';
    leftArrContainer.appendChild(leftAr);
    rightAr.innerHTML = '&#8250';
    rightArrContainer.appendChild(rightAr);
    clearInterval(intervalVar);
}

function updateProductiveTime(prodTime) {
    const output = document.getElementById("output");
    productiveTime += prodTime;
    prodHours = Math.floor(productiveTime / 60);
    prodMins = prodTime - (prodHours * 60);
    let textMins = "hours";
    if (prodHours === 1) {
        textHours = "hour";
    }

    if (prodHours > 0 && prodMins > 0) {
        output.innerHTML = `Congrats on being productive for ${hours} ${textHours} and ${prodMins} minutes`
    }
    else if (prodHours === 0) {
        output.innerHTML = `Congrats on being productive for ${prodMins} minutes`
    }
    else {
        output.innerHTML = `Congrats on being productive for ${prodHours} ${textHours}`
    }
}

// when logo is clicked, the extension should be activated, and it should remain active as you flip tabs
// once the timer ends, should add a popup message saying congrats, and then when they click ok everything is reset back to their default time
// need the time you have been productive for to clear every 24 hours
