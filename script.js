document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Завантаження задач з localStorage при завантаженні сторінки
    loadTasks();

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Отримати значення з input
        const task = taskInput.value.trim();

        // Перевірити чи input не пустий
        if (task !== '') {
            // Створити новий елемент списку
            const li = document.createElement('li');
            li.textContent = task;

            // Додати кнопку видалення
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Видалити';
            deleteBtn.addEventListener('click', function() {
                taskList.removeChild(li);
                removeTaskFromLocalStorage(task);
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);

            // Зберегти задачу у localStorage
            saveTaskToLocalStorage(task);

            // Очистити input
            taskInput.value = '';
        }
    });

    function saveTaskToLocalStorage(task) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function(task) {
            // Створити новий елемент списку
            const li = document.createElement('li');
            li.textContent = task;

            // Додати кнопку видалення
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Видалити';
            deleteBtn.addEventListener('click', function() {
                taskList.removeChild(li);
                removeTaskFromLocalStorage(task);
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    function removeTaskFromLocalStorage(task) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
