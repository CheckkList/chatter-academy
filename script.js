// =====================================================
// 🎓 CHATTER ACADEMY — SHIFT CHECKLIST
// =====================================================

const sections = [
    {
        title: "🌅 Подготовка к смене",
        tasks: [
            "Садимся за комп, улыбнулись, приготовились делать бабки 💵.",
            "10–15 минут до начала смены — подготовка рассылок для будущей смены.",
            "Начало рабочей смены — оповещение ТимЛида о начале смены в рабочем чате (структура старта смены прописана в закрепе в рабочем чате)."
        ]
    },

    {
        title: "🔥 Работа во время смены",
        tasks: [
            "Обработать все непрочитанные и висящие сообщения, просмотреть последние диалоги на наличие неотвеченных сообщений (список ✏️IGNORE) и при наличии таких проработать их.",
            "Просмотреть последние транзакции на анкете на наличие активных секстингов или отсутствие добивок / послепродажного обслуживания.",
            "Обработать список ✏️ Active Spenders_OM и прописать своих китов, если такие есть (в первые 2 часа смены).",
            "Обработать список 🌱 24H_OM, прописать руками всех фанов в списке.",
            "Запустить рассылку от самого OF (в первые 2 часа смены) и отменить все предыдущие рассылки сменщиков.",
            "По ходу смены проверять список ✏️IGNORE и прописывать фанов, которым не ответили.",
            "По ходу смены добавлять активные чаты в список CHATTING NOW «СМЕНА» (при наличии ЛЮБОГО ответа от фана).",
            "По ходу смены добавлять всех новых фанов в список «NEW FANS» текущего месяца, после чего каждого индивидуально прописывать ручным приветственным сообщением и добивкой (в первые 10 минут после подписки).",
            "По ходу смены проходиться по онлайн-фанам и онлайн-платникам «Spenders Online».",
            "По ходу смены соблюдать периодичность рассылок, которую вам задаёт ваш ТимЛид, например — минимум 4 рассылки от OF за 8-часовую смену."
        ]
    },

    {
        title: "🌙 Завершение смены",
        tasks: [
            "10 минут до конца смены — подготовка к завершению. Отменяем все рассылки от OF и от «БОТА».",
            "Конец рабочей смены — оповещение ТимЛида об окончании смены в рабочем чате, отчёт по фанам, отчёт по кассе и запись касс в таблицу."
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

        console.error(
            "Ошибка: элемент #checklist не найден."
        );

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

            // Полностью очищаем состояние
            savedState = {};

            // Сохраняем пустое состояние
            saveState();

            // Перерисовываем чек-лист
            renderChecklist();

        }
    );

}


// =====================================================
// START
// =====================================================

renderChecklist();
