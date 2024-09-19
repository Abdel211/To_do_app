document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const categoryInput = document.getElementById('categoryInput');
    const priorityInput = document.getElementById('priorityInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Fonction pour charger et afficher toutes les tâches
    const fetchTasks = () => {
        fetch('/tasks')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = '';
                tasks.forEach(task => {
                    createTaskElement(task);
                });
            });
    };

    // Fonction pour créer un élément de tâche dans la liste
    const createTaskElement = (task) => {
        const li = document.createElement('li');
        li.className = 'task';
        if (task.completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `
            <div>
                <strong>${task.title}</strong> - ${task.category} - Priority: ${task.priority}
                <br>Due date: ${task.dueDate}
            </div>
            <div>
                <button onclick="completeTask(${task.id})"><i class="fa fa-check"></i></button>
                <button onclick="deleteTask(${task.id})"><i class="fa fa-trash"></i></button>
            </div>
        `;
        taskList.appendChild(li);
    };

    // Charger les tâches lors du chargement de la page
    fetchTasks();

    // Soumettre une nouvelle tâche
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskInput.value;
        const category = categoryInput.value;
        const priority = priorityInput.value;
        const dueDate = dueDateInput.value;

        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, category, priority, dueDate })
        })
        .then(response => response.json())
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Task Added',
                text: 'Your task has been added successfully.',
                timer: 2000,
                showConfirmButton: false
            });
            taskInput.value = '';
            categoryInput.value = 'Personal';
            priorityInput.value = 'Low';
            dueDateInput.value = '';
            fetchTasks(); // Reload all tasks
        })
        .catch((error) => console.error('Error adding task:', error));
    });

    // Compléter une tâche
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

    // Activer/Désactiver le mode sombre
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelectorAll('.task').forEach(task => {
            task.classList.toggle('dark-mode');
        });
    });

    // Filtrer les tâches importantes
    document.getElementById('importantTasks').addEventListener('click', () => {
        fetch('/tasks/important')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = '';
                tasks.forEach(task => {
                    createTaskElement(task);
                });
            });
    });

    // Filtrer les tâches planifiées
    document.getElementById('plannedTasks').addEventListener('click', () => {
        fetch('/tasks/planned')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = '';
                tasks.forEach(task => {
                    createTaskElement(task);
                });
            });
    });

    // Filtrer les tâches complétées
    document.getElementById('completedTasks').addEventListener('click', () => {
        fetch('/tasks/completed')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = '';
                tasks.forEach(task => {
                    createTaskElement(task);
                });
            });
    });

    // Filtrer toutes les tâches
    document.getElementById('allTasks').addEventListener('click', () => {
        fetchTasks();
    });
});
