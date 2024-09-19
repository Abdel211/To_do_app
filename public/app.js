document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');

    // Fonction pour récupérer et afficher les tâches
    const fetchTasks = () => {
        fetch('/tasks')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = '';
                tasks.forEach(task => {
                    const li = document.createElement('li');
                    li.className = 'task';
                    if (task.completed) {
                        li.classList.add('completed');
                    }
                    li.innerHTML = `
                        ${task.title}
                        <button onclick="completeTask(${task.id})">Terminer</button>
                        <button onclick="deleteTask(${task.id})">Supprimer</button>
                    `;
                    taskList.appendChild(li);
                });
            });
    };

    // Appeler fetchTasks au chargement de la page
    fetchTasks();

    // Ajouter une nouvelle tâche
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskInput.value;

        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title })
        })
        .then(response => response.json())
        .then(() => {
            taskInput.value = '';
            fetchTasks();
        });
    });

    // Marquer une tâche comme terminée
    window.completeTask = (id) => {
        fetch(`/tasks/${id}`, {
            method: 'PUT'
        })
        .then(() => fetchTasks());
    };

    // Supprimer une tâche
    window.deleteTask = (id) => {
        fetch(`/tasks/${id}`, {
            method: 'DELETE'
        })
        .then(() => fetchTasks());
    };
});
