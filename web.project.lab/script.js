"use strict";

const name = prompt("Введите ваше имя:");
if (name && name.trim() !== "") {
    alert(`Здравствуйте, ${name.trim()}! Добро пожаловать на страницу «Искусство и креатив»!`);
} else {
    alert("Здравствуйте! Добро пожаловать на страницу «Искусство и креатив»!");
}

const daysCount = Math.floor(Math.random() * 3) + 5;
const temperatures = [];

for (let i = 0; i < daysCount; i++) {
    const temp = Math.floor(Math.random() * 41) - 5;
    temperatures.push(temp);
}

function findHottestDay(temps) {
    let maxTemp = temps[0];

    for (let i = 1; i < temps.length; i++) {
        if (temps[i] > maxTemp) {
            maxTemp = temps[i];
        }
    }

    return maxTemp;
}

function filterWarmDays(temps) {
    return temps.filter(temp => temp > 20);
}

function calculateAverageTemp(temps) {
    if (temps.length === 0) {
        return null;
    }

    let sum = 0;

    for (let i = 0; i < temps.length; i++) {
        sum += temps[i];
    }

    return sum / temps.length;
}

const hottestTemp = findHottestDay(temperatures);
const warmDays = filterWarmDays(temperatures);
const averageTemp = calculateAverageTemp(temperatures);

alert(
    `Средняя температура за период — ${averageTemp.toFixed(1)} °C, ` +
    `было ${warmDays.length} тёплых дней.`
);

let coldDaysCount = 0;
let coldDaysSum = 0;

for (let i = 0; i < temperatures.length; i++) {
    if (temperatures[i] <= 10) {
        coldDaysCount++;
        coldDaysSum += temperatures[i];
    }
}

if (coldDaysCount > 0) {
    const coldAverage = coldDaysSum / coldDaysCount;

    console.log("Количество холодных дней:", coldDaysCount);
    console.log("Средняя температура в холодные дни:", coldAverage.toFixed(1), "°C");
} else {
    console.log("Холодных дней не было.");
}

console.log("Температуры за период:", temperatures);
console.log("Максимальная температура:", hottestTemp, "°C");
console.log("Тёплые дни:", warmDays);
console.log("Количество тёплых дней:", warmDays.length);
console.log("Средняя температура за весь период:", averageTemp.toFixed(1), "°C");

if (hottestTemp >= 30) {
    console.log("Рекомендуется предусмотреть навесы и воду для гостей.");
}
const sections = document.querySelectorAll("main section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            sections.forEach((s) => s.classList.remove("active-section"));
            entry.target.classList.add("active-section");
        }
    });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach((s) => observer.observe(s));


const hobbyList = document.getElementById("hobbyList");
const addHobbyBtn = document.getElementById("addHobbyBtn");
const toggleViewBtn = document.getElementById("toggleViewBtn");
const toggleHobbiesBtn = document.getElementById("toggleHobbiesBtn");
const themeBtn = document.getElementById("themeBtn");
const hobbiesSection = document.querySelector("#hobbies");

function elementExists(element, description) {
    if (!element) {
        console.error(`Не найден элемент: ${description}. Действие не выполнено.`);
        return false;
    }
    return true;
}

function createHobbyItem(name, icon = "🔥") {
    const item = document.createElement("div");
    item.classList.add("hobby-item");

    const iconSpan = document.createElement("span");
    iconSpan.className = "hobby-icon";
    iconSpan.textContent = icon;

    const nameSpan = document.createElement("span");
    nameSpan.className = "hobby-name";
    nameSpan.textContent = name;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "×";
    deleteBtn.setAttribute("title", `Удалить «${name}»`);

    item.append(iconSpan, nameSpan, deleteBtn);
    return item;
}

function saveHobbies() {
    const hobbies = [];
    hobbyList.querySelectorAll(".hobby-item").forEach((item) => {
        hobbies.push({
            name: item.querySelector(".hobby-name").textContent,
            icon: item.querySelector(".hobby-icon").textContent
        });
    });
    localStorage.setItem("hobbies", JSON.stringify(hobbies));
}

function loadHobbies() {
    const saved = localStorage.getItem("hobbies");
    if (saved === null) {
        return;
    }
    try {
        const hobbies = JSON.parse(saved);
        hobbyList.innerHTML = "";
        hobbies.forEach((hobby) => hobbyList.append(createHobbyItem(hobby.name, hobby.icon)));
    } catch (error) {
        console.error("Ошибка чтения списка хобби из localStorage:", error);
    }
}

function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-theme", isDark);
    if (themeBtn) {
        themeBtn.textContent = isDark ? "Светлая тема" : "Тёмная тема";
    }
}

applyTheme(localStorage.getItem("theme"));

if (elementExists(themeBtn, "кнопка темы #themeBtn")) {
    themeBtn.addEventListener("click", () => {
        const newTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    });
}

if (elementExists(hobbyList, "контейнер #hobbyList")) {
    loadHobbies();

    hobbyList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            event.target.closest(".hobby-item").remove();
            saveHobbies();
        }
    });

    if (elementExists(addHobbyBtn, "кнопка #addHobbyBtn")) {
        addHobbyBtn.addEventListener("click", () => {
            const input = prompt("Введите название хобби:");
            if (input === null || input.trim() === "") {
                return;
            }
            hobbyList.append(createHobbyItem(input.trim()));
            saveHobbies();
        });
    }

    if (elementExists(toggleViewBtn, "кнопка #toggleViewBtn")) {
        toggleViewBtn.addEventListener("click", () => {
            hobbyList.classList.toggle("view-grid");
            hobbyList.classList.toggle("view-list");
        });
    }
}

if (elementExists(toggleHobbiesBtn, "кнопка #toggleHobbiesBtn") &&
    elementExists(hobbiesSection, "секция #hobbies")) {
    toggleHobbiesBtn.addEventListener("click", () => {
        const isHidden = hobbiesSection.classList.toggle("hidden");
        toggleHobbiesBtn.textContent = isHidden ? "Показать хобби" : "Скрыть хобби";
    });
}