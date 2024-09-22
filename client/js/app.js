import { addTask, displayTasks } from './components/taskComponent.js';
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from './utils/localStorage.js';

document.addEventListener('DOMContentLoaded', () => {
    let tasks = getTasksFromLocalStorage();
    displayTasks(tasks);

    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskInput = document.getElementById('taskInput').value;
        const priorityInput = document.getElementById('priorityInput').value;
        const dueDateInput = document.getElementById('dueDateInput').value;

        const task = {
            title: taskInput,
            priority: priorityInput,
            dueDate: dueDateInput
        };

        tasks = addTask(tasks, task);
        saveTasksToLocalStorage(tasks);
        displayTasks(tasks);
        taskForm.reset();
    });

    document.getElementById('darkModeToggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
