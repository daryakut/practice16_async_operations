// 1. Работаем с отложенным выполнением кода. Нужно вывести в консоль сообщение "Delayed message", через 5 секунд после запуска скрипта.

setTimeout(() => {
  console.log("Hello");
}, 5000);

// 2. Делаем блок на странице, который будет запускать отложенное выполнение. Нужно сделать инпут, в который будем вводить задержку в секундах, и кнопку "Запуск". При нажатии на кнопку "Запуск", нужно через N секунд вывести сообщение "Delayed message". N - это кол-во секунд, введенное в инпуте.
const mainContainer = document.querySelector(".mainContainer");
const myInput = document.createElement("input");
// myInput.type = "number";
const btn = document.createElement("button");
btn.innerText = "Click me";
mainContainer.append(myInput, btn);

let timeoutId;

btn.addEventListener("click", () => {
  btnCancel.classList.remove("cancel_hide");
  const delayInSeconds = myInput.value;

  if (!Number.isNaN(+delayInSeconds) && delayInSeconds > 0) {
    let delayInMillis = delayInSeconds * 1000;

    timeoutId = setTimeout(() => {
      console.log("Delayed message");
    }, delayInMillis);
  } else {
    console.log("Please enter a valid positive number in the input.");
  }
});

// 3. Дорабатываем наш блок. Добавляем кнопку "Отмена". Изначально она должна быть скрыта (рекомендуется воспользоваться CSS).
//  - когда мы нажимаем на кнопку "Запуск", мы показываем кнопку "Отмена".
//  - при нажатии на кнопку "Отмена", нам нужно отменить запланированное в `setTimeout` выполнение.
//  - если выполнение все же произошло (т.е. функциональность внутри `setTimeout` выполнилась), то кнопку "Отмена" скрываем.
const btnCancel = document.createElement("button");
btnCancel.innerText = "Cancel";
btnCancel.classList.add("cancel_hide");
mainContainer.append(btnCancel);
btnCancel.addEventListener("click", () => {
  clearTimeout(timeoutId);
});

// 4. Работаем с другой асинхронной операцией. Наша задача - каждые 5 секунд выводить в консоль сообщение "Прошло 5 секунд".
count = 0;
let intervalId = setInterval(() => {
  count++;
  console.log("it's been 5 sec");
  if (count === 5) {
    clearInterval(intervalId);
  }
}, 5000);

// 5. Добавляем на страницу текущие дату и время. Нужно добавить в разметку блок, в котором должны отображаться текущие дата и время, вида `01.01.2000 11:23:55`. И нужно сделать так, чтобы дата и время отображались актуальные (т.е. обновлять текст ежесекундно).
const datetimeElement = document.createElement("div");
datetimeElement.classList.add("datetimeElement");
mainContainer.append(datetimeElement);

function updateDateTime() {
  const now = new Date();
  const formattedDateTime = now.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  datetimeElement.textContent = formattedDateTime;
}

updateDateTime(); 
setInterval(updateDateTime, 1000); 

// 6. Реализуем простой секундомер. Нужно добавить в блок с id=`simpleTimerContainer` секундомер. В блоке будут:
//  - параграф, в котором будем выводить текущее время секундомера
//  - кнопка "Старт" - при нажатии запускаем секундомер
//  - кнопка "Сброс" - при нажатии сбрасываем секундомер.

const simpleTimerContainer = document.querySelector("#simpleTimerContainer");
const paragraph = document.createElement("p");
const startBtn = document.createElement("button");
startBtn.textContent = "Start";
const clearBtn = document.createElement("button");
clearBtn.textContent = "Clear";
const pauseBtn = document.createElement("button");
pauseBtn.textContent = "Pause";
const continueBtn = document.createElement("button");
continueBtn.textContent = "Continue";
paragraph.textContent = "00:00:00";
simpleTimerContainer.append(
  paragraph,
  startBtn,
  clearBtn,
  pauseBtn,
  continueBtn
);

let timerId;
let seconds = 0;
let isPaused = false;

function updateStopwatch() {
  if (!isPaused) {
    seconds++;
    const formattedTime = new Date(seconds * 1000).toISOString().slice(11, 19);
    paragraph.textContent = formattedTime;
  }
}

startBtn.addEventListener("click", () => {
  if (!timerId) {
    timerId = setInterval(updateStopwatch, 1000);
  }
});

clearBtn.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
  seconds = 0;
  paragraph.textContent = "00:00:00";
});

// 7. Усложняем наш секундомер. Нам нужно добавить кнопки "Пауза", "Возобновить". Первая будет приостанавливать, но не сбрасывать секундомер, а вторая - возобновлять его работу.

pauseBtn.addEventListener("click", () => {
  clearInterval(timerId);
  isPaused = true;
});

continueBtn.addEventListener("click", () => {
  if (isPaused) {
    timerId = setInterval(updateStopwatch, 1000);
    isPaused = false;
  }
});

// 8. Работаем с промисами. Задача - написать промис, который через 5 секунд будет успешно завершен текстом "Successfully finished!". Этот текст нужно вывести в консоль.
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success");
  }, 5000);
});

myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.error(error));

// myPromise.then(
//   (result) => console.log(result),
//   (error) => console.error(error)
// );

// 9. Теперь задача через 5 секунд завершить промис "неуспехом", с текстом "Something went wrong!", и вывести результат в консоль.
const myPromiseWithError = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Oops");
  }, 5000);
});

myPromiseWithError
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.log(error));



// гениальный пример

const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = Math.random() > 0.5;
      if (result) {
        resolve("Data loaded successfully");
      } else {
        reject("Error: Unable to fetch data");
      }
    }, 2000);
  });
};

fetchData().then((result)=>{
  console.log(result);
})
.catch((error)=>{
  console.log(error);
})
.finally(()=>{
  console.log("Operation complete, regardless of success or failure");
});

console.log(fetchData());