import { displayTasks } from './components/taskComponent.js';

// Récupérer les tâches depuis l'API
async function fetchTasks() {
    const response = await fetch('/tasks');
    return await response.json();
}

// Ajouter une tâche via l'API
async function addTaskToDB(task) {
    const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
    return await response.json();
}

// Mettre à jour une tâche dans la base de données
async function updateTaskInDB(id, task) {
    const response = await fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
    return await response.json();
}

// Supprimer une tâche de la base de données
async function deleteTaskFromDB(id) {
    await fetch(`/tasks/${id}`, {
        method: 'DELETE'
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const tasks = await fetchTasks();  // Récupérer les tâches de la BDD
    const taskList = document.getElementById('taskList');
    displayTasks(tasks, taskList, updateTaskInDB, deleteTaskFromDB);

    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskInput = document.getElementById('taskInput').value;
        const newTask = { title: taskInput, completed: false };
        const task = await addTaskToDB(newTask);  // Ajouter la tâche dans la BDD
        tasks.push(task);
        displayTasks(tasks, taskList, updateTaskInDB, deleteTaskFromDB);
        taskForm.reset();  // Réinitialiser le formulaire
    });
});
