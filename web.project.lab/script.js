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