var checklist = [
{
title: "🌅 Подготовка к смене",
tasks: [
"За 10–15 минут до начала смены подготовить сторис, посты и рассылки для будущей смены.",
"Оповестить менеджера о начале смены — тегнуть менеджера в рабочем чате модели и написать «старт».",
"Обработать все непрочитанные и висящие сообщения.",
"Просмотреть последние диалоги на наличие пропущенных и неотвеченных сообщений.",
"Загрузить подготовленные сторис на все анкеты, на которых ведётся работа.",
"Загрузить посты на анкеты согласно указаниям менеджера."
]
},
{
title: "🔥 Работа во время смены",
tasks: [
"Качественно обрабатывать все диалоги во вкладке сообщений.",
"Вести интересные, насыщенные и красочные диалоги без сухих сообщений.",
"Добавлять всех новых фанов в список NEW FANS.",
"Каждому новому фану отправлять индивидуальное ручное приветственное сообщение.",
"Минимум один раз за смену обработать списки потенциальных фанов.",
"Минимум один раз за смену обработать списки фанов с высокой суммой трат.",
"Проверять предыдущие сообщения сменщиков перед повторным контактом.",
"При необходимости использовать БОТА для ручной обработки.",
"Соблюдать установленную менеджером периодичность рассылок.",
"При низкой активности увеличивать частоту рассылок.",
"Актуализировать списки фанов после изменения их статуса.",
"Перемещать фанов в соответствующие списки по тратам.",
"Добавлять необходимых фанов в список ОСОБОЕ ВНИМАНИЕ.",
"Вести общение, секстинг и продажи контента и кастомного контента."
]
},
{
title: "🌙 Завершение смены",
tasks: [
"За 10 минут до конца смены отменить рассылки от OF.",
"За 10–5 минут до конца смены отменить рассылки от БОТА.",
"Оповестить менеджера об окончании смены — написать «стоп».",
"Подсчитать кассу во вкладке Statements по столбцу NET.",
"Подготовить отчёт по проделанной работе.",
"Добавить в отчёт информацию о наиболее потенциальных фанах смены."
]
}
];

var STORAGE_KEY = "chatter_academy_checklist_final";

var state = {};

var saved = localStorage.getItem(STORAGE_KEY);

if (saved) {
try {
state = JSON.parse(saved);
} catch (e) {
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
var sectionIndex;
var taskIndex;

for (sectionIndex = 0; sectionIndex < checklist.length; sectionIndex++) {
totalTasks =
totalTasks +
checklist[sectionIndex].tasks.length;
}

function saveState() {
localStorage.setItem(
STORAGE_KEY,
JSON.stringify(state)
);
}

function updateProgress() {

```
var completed = 0;
var i;

for (i = 0; i < totalTasks; i++) {

    if (state[i] === true) {
        completed++;
    }
}

var percent = 0;

if (totalTasks > 0) {
    percent =
        Math.round(
            completed / totalTasks * 100
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

function createTask(text, index) {

```
var task =
    document.createElement("div");

task.className = "task";

if (state[index] === true) {
    task.classList.add("completed");
}

var checkbox =
    document.createElement("div");

checkbox.className = "checkbox";

var textElement =
    document.createElement("div");

textElement.className = "task-text";

textElement.textContent = text;

task.appendChild(checkbox);
task.appendChild(textElement);

task.onclick = function() {

    if (state[index] === true) {

        state[index] = false;

        task.classList.remove(
            "completed"
        );

    } else {

        state[index] = true;

        task.classList.add(
            "completed"
        );
    }

    saveState();

    updateProgress();
};

return task;
```

}

function renderChecklist() {

```
checklistElement.innerHTML = "";

taskIndex = 0;

var i;
var j;

for (
    i = 0;
    i < checklist.length;
    i++
) {

    var section =
        document.createElement("section");

    section.className =
        "checklist-section";

    var title =
        document.createElement("div");

    title.className =
        "section-title";

    title.textContent =
        checklist[i].title;

    section.appendChild(title);

    for (
        j = 0;
        j < checklist[i].tasks.length;
        j++
    ) {

        var task =
            createTask(
                checklist[i].tasks[j],
                taskIndex
            );

        section.appendChild(task);

        taskIndex++;
    }

    checklistElement.appendChild(section);
}

updateProgress();
```

}

resetButton.onclick = function() {

```
var confirmed =
    window.confirm(
        "Начать новую смену?\n\nВсе отмеченные задачи будут сброшены."
    );

if (!confirmed) {
    return;
}

state = {};

saveState();

renderChecklist();

window.scrollTo(
    0,
    0
);
```

};

renderChecklist();
