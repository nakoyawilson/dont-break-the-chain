// Copyright Year
const currentYear = document.querySelector(".current-year");
currentYear.innerHTML = new Date().getFullYear();

// Activity Display
const activityDisplay = document.querySelector(".activity-display");
const chosenActivity = document.querySelector(".chosen-activity");
const activityForm = document.querySelector(".activity-form");
const activityName = document.querySelector(".activity-name");
const submit = document.querySelector("#activity-submit");

if (localStorage.length == 0 || localStorage.userActivity === "") {
    activityDisplay.style.display = "none";
    activityForm.style.display = "block";
} else {
    activityForm.style.display = "none";
    activityDisplay.style.display = "block";
    const activity = localStorage.getItem("userActivity");
    chosenActivity.innerHTML = activity;
}
localStorage.setItem("userActivity", chosenActivity.innerHTML)

submit.addEventListener("click", () => {
    activityForm.style.display = "none";
    activityDisplay.style.display = "block";
    chosenActivity.innerHTML = activityName.value;
    localStorage.setItem("userActivity", chosenActivity.innerHTML)
})

// Create Calendar

const getNumberOfDays = (month, year) => {
    return new Date(year, month, 0).getDate();
}

const calendar = document.querySelector(".calendar");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const crossOffDay = () => {

}

const daysContainer = document.querySelector(".days-container");

let count = 0;
for (let i = 0; i < 12; i++) {
    const monthText = months[i];
    const numDays = getNumberOfDays(i + 1, 2022);
    const monthContainer = document.createElement("div");
    calendar.append(monthContainer);
    for (let j = 0; j < numDays; j++) {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("days-button");
        const buttonID = `${monthText.toLowerCase()}-${j + 1}`
        const day = j + 1
        monthContainer.append(button);
        if (i % 2 === 0) {
            button.classList.add("even");
        } else {
            button.classList.add("odd");
        }
        if (i === 0 && j === 0) {
            daysContainer.append(button);
            const lineBreak = document.createElement("br");
            daysContainer.append(lineBreak);
        } else if (count % 7 === 0) {
            daysContainer.append(button);
            const lineBreak = document.createElement("br");
            daysContainer.append(lineBreak);
        } else {
            daysContainer.append(button)
        }
        count++;
        button.classList.add("day");
        button.setAttribute("id", buttonID)
        if (localStorage.length < 366) {
            button.innerHTML = day;
        } else {
            button.innerHTML = localStorage.getItem(`button-${buttonID}`);
        }
        button.addEventListener("click", () => {
            if (button.innerHTML === day.toString()) {
                button.innerHTML = "<i class='fas fa-times'></i>";
                localStorage.setItem(`button-${buttonID}`, button.innerHTML);
            } else {
                button.innerHTML = day;
                localStorage.setItem(`button-${buttonID}`, button.innerHTML);
            }
        })
        localStorage.setItem(`button-${buttonID}`, button.innerHTML);
    }
}

// Change activity
const changeButton = document.querySelector("#change");
changeButton.addEventListener("click", () => {
    activityDisplay.style.display = "none";
    activityForm.style.display = "block";
})

// Clear calendar
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    const activity = localStorage.getItem("userActivity");
    console.log(activity);
    localStorage.clear();
    chosenActivity.innerHTML = activity;
    localStorage.setItem("userActivity", chosenActivity.innerHTML);
    location.reload();
})