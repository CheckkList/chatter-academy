var checklist = [
{
title: "🌅 Подготовка к смене",
tasks: [
"За 10–15 минут до начала смены подготовить сторис, посты и рассылки.",
"Оповестить менеджера о начале смены и написать «старт».",
"Обработать все непрочитанные и висящие сообщения.",
"Просмотреть последние диалоги и найти пропущенные сообщения.",
"Загрузить подготовленные сторис на рабочие анкеты.",
"Загрузить посты согласно указаниям менеджера."
]
},
{
title: "🔥 Работа во время смены",
tasks: [
"Качественно обрабатывать все диалоги.",
"Вести интересные, насыщенные и красочные диалоги.",
"Добавлять всех новых фанов в список NEW FANS.",
"Отправлять каждому новому фану индивидуальное приветственное сообщение.",
"Обработать список потенциальных фанов минимум один раз за смену.",
"Обработать списки фанов с высокой суммой трат.",
"Проверять предыдущие сообщения сменщиков.",
"При необходимости использовать БОТА.",
"Соблюдать установленную менеджером периодичность рассылок.",
"При низкой активности увеличивать частоту рассылок.",
"Актуализировать списки фанов после изменения их статуса.",
"Перемещать фанов в соответствующие списки по тратам.",
"Добавлять важных фанов в список ОСОБОЕ ВНИМАНИЕ.",
"Работать с фанами, вести секстинг и продавать контент."
]
},
{
title: "🌙 Завершение смены",
tasks: [
"За 10 минут до конца отменить рассылки OF.",
"За 10–5 минут до конца отменить рассылки БОТА.",
"Оповестить менеджера об окончании смены и написать «стоп».",
"Подсчитать кассу во вкладке Statements по столбцу NET.",
"Подготовить отчёт по проделанной работе.",
"Добавить информацию о наиболее потенциальных фанах смены."
]
}
];

var STORAGE_KEY = "chatter_academy_progress";

var state = {};

var oldData = localStorage.getItem(STORAGE_KEY);

if (oldData !== null) {
try {
state = JSON.parse(oldData);
} catch (error) {
state = {};
}
}

var checklistElement = document.getElementById("checklist");
var progressCount = document.getElementById("progress-count");
var progressPercent = document.getElementById("progress-percent");
var progressFill = document.getElementById("progress-fill");
var completeMessage = document.getElementById("complete-message");
var resetButton = document.getElementById("reset-button");

var totalTasks = 0;
var i;
var j;

for (i = 0; i < checklist.length; i++) {
totalTasks =
totalTasks +
checklist[i].tasks.length;
}

function saveProgress() {

```
localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
);
```

}

function updateProgress() {

```
var completed = 0;
var percent = 0;
var i;

for (i = 0; i < totalTasks; i++) {

    if (state[i] === true) {
        completed++;
    }
}

if (totalTasks > 0) {

    percent =
        Math.round(
            completed * 100 / totalTasks
        );
}

progressCount.textContent =
    completed +
    " / " +
    totalTasks +
    " выполнено";

progressPercent.textContent =
    percent +
    "%";

progressFill.style.width =
    percent +
    "%";

if (
    completed === totalTasks &&
    totalTasks > 0
) {

    completeMessage.style.display =
        "block";

} else {

    completeMessage.style.display =
        "none";
}
```

}

function makeTask(text, number) {

```
var element =
    document.createElement("div");

element.className = "task";

var checkbox =
    document.createElement("div");

checkbox.className = "checkbox";

var label =
    document.createElement("div");

label.className = "task-text";

label.textContent = text;

element.appendChild(checkbox);
element.appendChild(label);

if (state[number] === true) {
    element.classList.add("completed");
}

element.onclick = function() {

    if (state[number] === true) {

        state[number] = false;

        element.classList.remove(
            "completed"
        );

    } else {

        state[number] = true;

        element.classList.add(
            "completed"
        );
    }

    saveProgress();

    updateProgress();
};

return element;
```

}

function renderChecklist() {

```
checklistElement.innerHTML = "";

var number = 0;
var i;
var j;

for (i = 0; i < checklist.length; i++) {

    var section =
        document.createElement("section");

    section.className =
        "checklist-section";

    var heading =
        document.createElement("div");

    heading.className =
        "section-title";

    heading.textContent =
        checklist[i].title;

    section.appendChild(heading);

    for (
        j = 0;
        j < checklist[i].tasks.length;
        j++
    ) {

        var task =
            makeTask(
                checklist[i].tasks[j],
                number
            );

        section.appendChild(task);

        number++;
    }

    checklistElement.appendChild(section);
}

updateProgress();
```

}

function resetShift() {

```
var answer =
    window.confirm(
        "Начать новую смену? Все галочки будут сброшены."
    );

if (answer !== true) {
    return;
}

state = {};

saveProgress();

renderChecklist();
```

}

resetButton.onclick = resetShift;

renderChecklist();
