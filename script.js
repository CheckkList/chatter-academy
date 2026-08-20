const checklist = [

```
{
    title: "🌅 Подготовка к смене",

    tasks: [

        "За 10–15 минут до начала смены подготовить сторис, посты и рассылки для будущей смены.",

        "Оповестить менеджера о начале смены — тегнуть его в рабочем чате модели и написать «старт».",

        "Обработать все непрочитанные и висящие сообщения.",

        "Просмотреть последние диалоги на наличие пропущенных / неотвеченных сообщений.",

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

        "При необходимости использовать «БОТА» для ручной обработки.",

        "Соблюдать установленную менеджером периодичность рассылок.",

        "При низкой активности увеличивать частоту рассылок.",

        "Актуализировать списки фанов после изменения их статуса.",

        "Перемещать фанов в соответствующие списки по тратам.",

        "Добавлять необходимых фанов в список ОСОБОЕ ВНИМАНИЕ.",

        "Вести общение, секстинг и продажи контента / кастомного контента."

    ]
},


{
    title: "🌙 Завершение смены",

    tasks: [

        "За 10 минут до конца смены отменить рассылки от OF.",

        "За 10–5 минут до конца смены отменить рассылки от «БОТА».",

        "Оповестить менеджера об окончании смены — написать «стоп».",

        "Подсчитать кассу во вкладке Statements по столбцу NET.",

        "Подготовить отчёт по проделанной работе.",

        "Добавить в отчёт информацию о наиболее потенциальных фанах смены."

    ]
}
```

];

// ======================================================
// STORAGE
// ======================================================

const STORAGE_KEY =
"chatter-academy-checklist-v1";

let state = {};

try {

```
state =
    JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || {};
```

} catch {

```
state = {};
```

}

// ======================================================
// ELEMENTS
// ======================================================

const checklistElement =
document.getElementById("checklist");

const progressCount =
document.getElementById("progress-count");

const progressPercent =
document.getElementById("progress-percent");

const progressFill =
document.getElementById("progress-fill");

const completeMessage =
document.getElementById("complete-message");

const resetButton =
document.getElementById("reset-button");

// ======================================================
// TOTAL
// ======================================================

let totalTasks = 0;

for (const section of checklist) {

```
totalTasks +=
    section.tasks.length;
```

}

// ======================================================
// SAVE
// ======================================================

function save() {

```
localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
);
```

}

// ======================================================
// PROGRESS
// ======================================================

function updateProgress() {

```
let completed = 0;

for (let i = 0; i < totalTasks; i++) {

    if (state[i] === true) {

        completed++;

    }

}


const percentage =
    totalTasks === 0
        ? 0
        : Math.round(
            completed /
            totalTasks *
            100
        );


progressCount.textContent =
    `${completed} / ${totalTasks} выполнено`;

progressPercent.textContent =
    `${percentage}%`;

progressFill.style.width =
    `${percentage}%`;


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

// ======================================================
// CREATE TASK
// ======================================================

let taskIndex = 0;

for (const section of checklist) {

```
const sectionElement =
    document.createElement("section");

sectionElement.className =
    "checklist-section";


const title =
    document.createElement("div");

title.className =
    "section-title";

title.textContent =
    section.title;


sectionElement.appendChild(title);


for (const taskText of section.tasks) {

    const index =
        taskIndex++;


    const task =
        document.createElement("div");

    task.className =
        "task";


    if (state[index] === true) {

        task.classList.add(
            "completed"
        );

    }


    const checkbox =
        document.createElement("div");

    checkbox.className =
        "checkbox";


    const text =
        document.createElement("div");

    text.className =
        "task-text";

    text.textContent =
        taskText;


    task.appendChild(
        checkbox
    );

    task.appendChild(
        text
    );


    task.addEventListener(
        "click",
        () => {

            state[index] =
                state[index] !== true;


            if (state[index]) {

                task.classList.add(
                    "completed"
                );

            } else {

                task.classList.remove(
                    "completed"
                );

            }


            save();

            updateProgress();

        }
    );


    sectionElement.appendChild(
        task
    );

}


checklistElement.appendChild(
    sectionElement
);
```

}

// ======================================================
// RESET
// ======================================================

resetButton.addEventListener(
"click",
() => {

```
    const confirmed =
        window.confirm(
            "Начать новую смену? Все отметки будут сброшены."
        );


    if (!confirmed) {

        return;

    }


    state = {};

    save();


    document
        .querySelectorAll(".task")
        .forEach(
            task => {

                task.classList.remove(
                    "completed"
                );

            }
        );


    updateProgress();

}
```

);

// ======================================================
// START
// ======================================================

updateProgress();

