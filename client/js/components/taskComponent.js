export const displayTasks = (tasks, taskList, toggleTaskCompletion, deleteTask) => {
    taskList.innerHTML = '';  // Réinitialiser la liste des tâches

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('flex', 'justify-between', 'items-center', 'p-4', 'bg-white', 'rounded', 'shadow-md', 'dark:bg-gray-700', 'transition-all', 'duration-300', 'ease-in-out');
        
        li.innerHTML = `
            <span class="${task.completed ? 'line-through text-gray-400' : ''}">${task.title}</span>
            <div>
                <button class="bg-green-500 text-white px-4 py-2 rounded complete-btn">Complete</button>
                <button class="bg-red-500 text-white px-4 py-2 ml-2 rounded delete-btn">Delete</button>
            </div>
        `;
        
        // Ajout des boutons dans le DOM
        taskList.appendChild(li);

        // Attacher les événements via addEventListener
        li.querySelector('.complete-btn').addEventListener('click', async () => {
            task.completed = !task.completed;
            await toggleTaskCompletion(task._id, task);  // Mettre à jour la tâche dans la BDD
            displayTasks(tasks, taskList, toggleTaskCompletion, deleteTask);
        });

        li.querySelector('.delete-btn').addEventListener('click', async () => {
            await deleteTask(task._id);  // Supprimer la tâche de la BDD
            tasks.splice(index, 1);  // Supprimer la tâche de la liste
            displayTasks(tasks, taskList, toggleTaskCompletion, deleteTask);  // Réafficher la liste
        });
    });
};
