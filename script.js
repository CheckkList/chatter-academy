// =====================================================
// 🎓 CHATTER ACADEMY — SHIFT CHECKLIST
// =====================================================

const sections = [
    {
        title: "🌅 Подготовка к смене",
        tasks: [
            "Подготовить сторис, посты и рассылки за 10–15 минут до смены.",
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
            "Вести интересные и насыщенные диалоги.",
            "Добавлять новых фанов в NEW FANS.",
            "Отправлять каждому новому фану индивидуальное приветствие.",
            "Обработать список потенциальных фанов.",
            "Обработать списки фанов с высокой суммой трат.",
            "Проверять предыдущие сообщения сменщиков.",
            "При необходимости использовать БОТА.",
            "Соблюдать периодичность рассылок менеджера.",
            "При низкой активности увеличивать частоту рассылок.",
            "Актуализировать списки фанов.",
            "Перемещать фанов в соответствующие списки по тратам.",
            "Добавлять важных фанов в ОСОБОЕ ВНИМАНИЕ.",
            "Вести общение, секстинг и продажи контента.",
            "Работать с кастомным контентом."
        ]
    },

    {
        title: "🌙 Завершение смены",
        tasks: [
            "За 10 минут до конца отменить рассылки OF.",
            "За 5–10 минут до конца отменить рассылки БОТА.",
            "Оповестить менеджера об окончании смены и написать «стоп».",
            "Подсчитать кассу в Statements по столбцу NET.",
            "Подготовить отчёт по проделанной работе.",
            "Добавить в отчёт наиболее потенциальных фанов."
        ]
    }
];


// =====================================================
// STORAGE
// =====================================================

const storageKey = "chatter-academy-shift-checklist";

let savedState = {};

try {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
        const parsed = JSON.parse(saved);

        if (
            parsed &&
            typeof parsed === "object" &&
            !Array.isArray(parsed)
        ) {
            savedState = parsed;
        }
    }
} catch (error) {
    console.warn(
        "Не удалось загрузить состояние чек-листа:",
        error
    );
}


// =====================================================
// ELEMENTS
// =====================================================

const checklist =
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


// =====================================================
// TOTAL TASKS
// =====================================================

const totalTasks =
    sections.reduce(
        (sum, section) =>
            sum + section.tasks.length,
        0
    );


// =====================================================
// STATE HELPERS
// =====================================================

function isCompleted(index) {
    return savedState[index] === true;
}


function getCompletedCount() {

    let completed = 0;

    for (
        let i = 0;
        i < totalTasks;
        i++
    ) {

        if (isCompleted(i)) {
            completed++;
        }

    }

    return completed;
}


// =====================================================
// SAVE STATE
// =====================================================

function saveState() {

    try {

        localStorage.setItem(
            storageKey,
            JSON.stringify(savedState)
        );

    } catch (error) {

        console.warn(
            "Не удалось сохранить состояние чек-листа:",
            error
        );

    }
}


// =====================================================
// UPDATE PROGRESS
// =====================================================

function updateProgress() {

    const completed =
        getCompletedCount();

    const percentage =
        totalTasks === 0
            ? 0
            : Math.round(
                (completed / totalTasks) * 100
            );


    if (progressCount) {

        progressCount.textContent =
            `${completed} / ${totalTasks} выполнено`;

    }


    if (progressPercent) {

        progressPercent.textContent =
            `${percentage}%`;

    }


    if (progressFill) {

        progressFill.style.width =
            `${percentage}%`;

    }


    if (completeMessage) {

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

    }

}


// =====================================================
// CREATE TASK
// =====================================================

function createTask(
    taskText,
    index
) {

    const task =
        document.createElement("div");

    task.className =
        "academy-task";


    if (isCompleted(index)) {

        task.classList.add(
            "completed"
        );

    }


    // Checkbox
    const checkbox =
        document.createElement("div");

    checkbox.className =
        "academy-checkbox";


    // Text
    const text =
        document.createElement("div");

    text.className =
        "academy-task-text";

    text.textContent =
        taskText;


    // Click
    task.addEventListener(
        "click",
        () => {

            savedState[index] =
                !isCompleted(index);


            task.classList.toggle(
                "completed",
                savedState[index]
            );


            saveState();

            updateProgress();

        }
    );


    task.appendChild(
        checkbox
    );

    task.appendChild(
        text
    );


    return task;
}


// =====================================================
// RENDER CHECKLIST
// =====================================================

function renderChecklist() {

    if (!checklist) {
        return;
    }


    checklist.innerHTML = "";


    let globalIndex = 0;


    sections.forEach(
        (section) => {

            const sectionElement =
                document.createElement("section");

            sectionElement.className =
                "academy-section";


            const title =
                document.createElement("h2");

            title.className =
                "academy-section-title";

            title.textContent =
                section.title;


            sectionElement.appendChild(
                title
            );


            section.tasks.forEach(
                (taskText) => {

                    const task =
                        createTask(
                            taskText,
                            globalIndex
                        );


                    sectionElement.appendChild(
                        task
                    );


                    globalIndex++;

                }
            );


            checklist.appendChild(
                sectionElement
            );

        }
    );


    updateProgress();
}


// =====================================================
// START NEW SHIFT
// =====================================================

if (resetButton) {

    resetButton.addEventListener(
        "click",
        () => {

            // Сразу очищаем все отмеченные задачи
            savedState = {};

            // Сохраняем пустое состояние
            saveState();

            // Полностью перерисовываем чек-лист
            renderChecklist();

        }
    );

}


// =====================================================
// START
// =====================================================

renderChecklist();
