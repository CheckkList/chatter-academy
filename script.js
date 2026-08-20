var tasks = [
"🌅 Подготовить сторис, посты и рассылки за 10–15 минут до смены.",
"🌅 Оповестить менеджера о начале смены и написать «старт».",
"🌅 Обработать все непрочитанные и висящие сообщения.",
"🌅 Просмотреть последние диалоги и найти пропущенные сообщения.",
"🌅 Загрузить подготовленные сторис на рабочие анкеты.",
"🌅 Загрузить посты согласно указаниям менеджера.",

```
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
```

];

var storageName = "chatter_academy_shift";

var saved = localStorage.getItem(storageName);

var checked = [];

if (saved) {
try {
checked = JSON.parse(saved);
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

container.innerHTML = "";

var completed = 0;

var i;

for (i = 0; i < tasks.length; i++) {

```
var item = document.createElement("div");

item.className = "task";

var box = document.createElement("div");

box.className = "checkbox";

var text = document.createElement("div");

text.className = "task-text";

text.textContent = tasks[i];

item.appendChild(box);

item.appendChild(text);

if (checked[i] === true) {

    item.classList.add("completed");

    completed++;
}

(function(currentItem, currentNumber) {

    currentItem.onclick = function() {

        if (checked[currentNumber] === true) {

            checked[currentNumber] = false;

            currentItem.classList.remove(
                "completed"
            );

        } else {

            checked[currentNumber] = true;

            currentItem.classList.add(
                "completed"
            );
        }

        localStorage.setItem(
            storageName,
            JSON.stringify(checked)
        );

        var done = 0;

        var x;

        for (x = 0; x < tasks.length; x++) {

            if (checked[x] === true) {
                done++;
            }
        }

        var percent = 0;

        if (tasks.length > 0) {

            percent =
                Math.round(
                    done * 100 / tasks.length
                );
        }

        countElement.textContent =
            done +
            " / " +
            tasks.length +
            " выполнено";

        percentElement.textContent =
            percent +
            "%";

        fillElement.style.width =
            percent +
            "%";

        if (done === tasks.length) {

            messageElement.style.display =
                "block";

        } else {

            messageElement.style.display =
                "none";
        }
    };

})(item, i);

container.appendChild(item);
```

}

var initialPercent = 0;

if (tasks.length > 0) {

```
initialPercent =
    Math.round(
        completed * 100 / tasks.length
    );
```

}

countElement.textContent =
completed +
" / " +
tasks.length +
" выполнено";

percentElement.textContent =
initialPercent +
"%";

fillElement.style.width =
initialPercent +
"%";

if (completed === tasks.length) {

```
messageElement.style.display =
    "block";
```

} else {

```
messageElement.style.display =
    "none";
```

}

resetElement.onclick = function() {

```
var answer =
    window.confirm(
        "Начать новую смену? Все галочки будут сброшены."
    );

if (!answer) {
    return;
}

checked = [];

localStorage.removeItem(
    storageName
);

window.location.reload();
```

};

