// const left = document.getElementById("leftArrow");
// const right = document.getElementById("rightArrow");
// const logoButton = document.getElementById("logoButton");

// left.addEventListener("click", leftUpdater);
// right.addEventListener("click", rightUpdater);
// logoButton.addEventListener("click", startTimer);

// const time = document.getElementById("time");
// let mins = Number(time.textContent.split(":")[0]);

// function leftUpdater() {
//     if (mins != 5) {
//         mins -= 5;
//         time.innerHTML = `${mins}:00`;
//         right.style.opacity = "100%";
//         if (mins === 5) {
//             left.style.opacity = "50%";
//         }
//     }
// }

// function rightUpdater() {
//     if (mins != 120) {
//         mins += 1;
//         time.innerHTML = `${mins}:00`;
//         left.style.opacity = "100%";
//         if (mins === 120) {
//             right.style.opacity = "50%";
//         }
//     }
// }

// let secs = Number(time.textContent.split(":")[1]);

// if (localStorage.getItem("prodTime") === null) {
//     let date = new Date().getDate();
//     let prodStr = JSON.stringify(["0", {date}]);
//     localStorage.setItem("prodTime", prodStr);
// }

// let dateToday = new Date().getDate();
// if (dateToday != getDate()) {
//     prodTimeStr = JSON.stringify(["0", {dateToday}]);
//     localStorage.setItem("prodTime", prodTimeStr);
// }

// function getProdParsed() {
//     let prodStrs = localStorage.getItem("prodTime");
//     let prodParsed = JSON.parse(prodStrs);
//     return prodParsed;
// }

// function getDate() {
//     let date = getProdParsed()[1].date;
//     return date;
// }

// if (localStorage.getItem("mins") != null) {
//     startTimer();
// }

// function getProdTime() {
//     let prod = Number(getProdParsed()[0]);
//     return prod;
// }
// document.getElementById("output").innerHTML = `You have been productive for ${getProdTime()} minutes today`

// function startTimer () {
//     let startingTime = new Date().getTime();
//     hideArrows();
//     logoButton.removeEventListener("click", startTimer);

//     if (localStorage.getItem("mins") == null) {
//         localStorage.setItem("timerLength", mins);
//         localStorage.setItem("startingTime", startingTime);
//         const interval = setInterval(function() { timer(startingTime, mins, secs, interval); });
//     }
//     else {
//         const interval = setInterval(function() { timer(localStorage.getItem("startingTime"), Number(localStorage.getItem("timerLength"))), Number(localStorage.getItem("secs"), interval); })
//     }
// }

// function hideArrows() {
//     left.style.display = 'none';
//     right.style.display = 'none';
// }

// function timer(startTime, startMins, startSecs, intervalVar) {
//     let currTime = new Date().getTime();
//     let distance = currTime - startTime;
//     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
//     const timerMins = startMins - minutes - 1;
//     localStorage.setItem("mins", timerMins);
//     const timerSecs = secs - seconds + 59;
//     localStorage.setItem("secs", timerSecs);
//     localStorage.setItem("time", currTime);
//     if (timerSecs < 10) {
//         time.innerHTML = `${timerMins}:0${timerSecs}`; 
//     }
//     else if (timerMins < 10) {
//         time.innerHTML = `0${timerMins}:${timerSecs}`;
//     }
//     else {
//         time.innerHTML = `${timerMins}:${timerSecs}`;
//     }

//     if (timerMins < 0) {
//         alert(`Congratulations on maintaining a productive streak for ${startMins} minutes! Keep up the great work!`);
//         resetTimer(startMins, intervalVar);
//     }
// }

// function resetTimer(startMins, intervalVar) {
//     time.innerHTML = `${startMins}:00`;
//     // let keys = ["mins", "secs", "time", "timerLength"];
//     localStorage.removeItem("mins");
//     localStorage.removeItem("secs");
//     localStorage.removeItem("time");
//     localStorage.removeItem("timerLength");
//     localStorage.removeItem("startingTime");
//     displayArrows();
//     clearInterval(intervalVar);
//     updateProductiveTime(startMins);
//     logoButton.addEventListener("click", startTimer);
// }

// function updateProductiveTime(prodTime) {
//     let textOutput = document.getElementById("output");
//     let currProd = getProdTime();
//     let totalProd = currProd + prodTime;
//     let date = new Date().getDate();
//     let prodStr = JSON.stringify([`${totalProd}`, {date}]);
//     localStorage.setItem("prodTime", prodStr);
//     prodHours = Math.floor(totalProd / 60);
//     prodMins = totalProd - (prodHours * 60);
//     let textHours = "hours";
//     if (prodHours === 1) {
//         textHours = "hour";
//     }

//     if (prodHours > 0 && prodMins > 0) {
//         textOutput.innerHTML = `You have been productive for ${prodHours} ${textHours} and ${prodMins} minutes today`
//     }
//     else if (prodHours === 0) {
//         textOutput.innerHTML = `You have been productive for ${prodMins} minutes today`
//     }
//     else {
//         textOutput.innerHTML = `You have been productive for ${prodHours} ${textHours} today`
//     }
// }

// function displayArrows() {
//     right.style.display = 'inline';
//     left.style.display = 'inline';
// }





// an issue is that if you just download the extension and go on the pop up and don't check the settings menu, then the websites
// from the block list will not be saved in local storage and they cannot be accessed so you would essentially be
// blocking nothing