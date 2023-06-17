const left = document.getElementById("leftArrow");
const time = document.getElementById("time");
const right = document.getElementById("rightArrow");
const logoButton = document.getElementById("logoButton");
let accTime = Number(time.textContent.split(":")[0]);
left.addEventListener("click", leftUpdater);
right.addEventListener("click", rightUpdater);
logoButton.addEventListener("click", startTimer)

function leftUpdater() {
    if (time.textContent != "10:00") {
        time.innerHTML = `${accTime - 5}:00`;
        accTime -= 5;
    }
}

function rightUpdater() {
    if (time.textContent != "180:00") {
        time.innerHTML = `${accTime + 5}:00`;
        accTime += 5;
    }
}

function startTimer () {
    left.innerHTML = "";
    right.innerHTML = "";
}



// also we will have to add an event listener for when the logo is clicked which causes the arrow buttons to dissappear and for a countdown to appear for a limited
// amount of time which activates the extension
