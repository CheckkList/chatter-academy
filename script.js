var tasks = [
    "🌅 Подготовить сторис, посты и рассылки за 10–15 минут до смены.",
    "🌅 Оповестить менеджера о начале смены и написать «старт».",
    "🌅 Обработать все непрочитанные и висящие сообщения.",
    "🌅 Просмотреть последние диалоги и найти пропущенные сообщения.",
    "🌅 Загрузить подготовленные сторис на рабочие анкеты.",
    "🌅 Загрузить посты согласно указаниям менеджера.",

    "🔥 Качественно обрабатывать все диалоги.",
    "🔥 Вести интересные и насыщенные диалоги.",
    "🔥 Добавлять новых фанов в NEW FANS.",
    "🔥 Отправлять каждому новому фану индивидуальное приветствие.",
    "🔥 Обработать список потенциальных фанов.",
    "🔥 Обработать списки фанов с высокой суммой трат.",
    "🔥 Проверять предыдущие сообщения сменщиков.",
    "🔥 При необходимости использовать БОТА.",
    "🔥 Соблюдать периодичность рассылок менеджера.",
    "🔥 При низкой активности увеличивать частоту рассылок.",
    "🔥 Актуализировать списки фанов.",
    "🔥 Перемещать фанов в соответствующие списки по тратам.",
    "🔥 Добавлять важных фанов в ОСОБОЕ ВНИМАНИЕ.",
    "🔥 Вести общение, секстинг и продажи контента.",
    "🔥 Работать с кастомным контентом.",

    "🌙 За 10 минут до конца отменить рассылки OF.",
    "🌙 За 5–10 минут до конца отменить рассылки БОТА.",
    "🌙 Оповестить менеджера об окончании смены и написать «стоп».",
    "🌙 Подсчитать кассу в Statements по столбцу NET.",
    "🌙 Подготовить отчёт по проделанной работе.",
    "🌙 Добавить в отчёт наиболее потенциальных фанов."
];

var storageName = "chatter_academy_shift";

var saved = localStorage.getItem(storageName);

var checked = [];

if (saved) {
    try {
        checked = JSON.parse(saved);

        if (!Array.isArray(checked)) {
            checked = [];
        }
    } catch (error) {
        checked = [];
    }
}

var container = document.getElementById("checklist");
var countElement = document.getElementById("progress-count");
var percentElement = document.getElementById("progress-percent");
var fillElement = document.getElementById("progress-fill");
var messageElement = document.getElementById("complete-message");
var resetElement = document.getElementById("reset-button");


function saveProgress() {
    localStorage.setItem(
        storageName,
        JSON.stringify(checked)
    );
}


function updateProgress() {

    var completed = checked.filter(function(value) {
        return value === true;
    }).length;

    var total = tasks.length;

    var percent = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    countElement.textContent =
        completed + " / " + total;

    percentElement.textContent =
        percent + "%";

    fillElement.style.width =
        percent + "%";


    if (completed === total && total > 0) {

        messageElement.style.display = "block";

    } else {

        messageElement.style.display = "none";

    }
}


function createTask(index) {

    var row = document.createElement("div");

    row.className = "shift-task";


    var checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.className = "shift-checkbox";

    checkbox.checked = checked[index] === true;


    var label = document.createElement("label");

    label.className = "shift-task-text";

    label.textContent = tasks[index];


    if (checkbox.checked) {
        row.classList.add("completed");
    }


    checkbox.addEventListener("change", function() {

        checked[index] = checkbox.checked;

        if (checkbox.checked) {

            row.classList.add("completed");

        } else {

            row.classList.remove("completed");

        }

        saveProgress();

        updateProgress();

    });


    label.addEventListener("click", function() {

        checkbox.checked = !checkbox.checked;

        checkbox.dispatchEvent(
            new Event("change")
        );

    });


    row.appendChild(checkbox);

    row.appendChild(label);

    container.appendChild(row);
}


function renderTasks() {

    container.innerHTML = "";

    for (var i = 0; i < tasks.length; i++) {

        createTask(i);

    }

    updateProgress();
}


resetElement.addEventListener("click", function() {

    var confirmed = confirm(
        "Сбросить все задачи текущей смены?"
    );

    if (!confirmed) {
        return;
    }


    checked = [];

    saveProgress();

    renderTasks();

});


renderTasks();
