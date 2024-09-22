export const addTask = (tasks, task) => {
    tasks.push(task);
    return tasks;
};

export const displayTasks = (tasks) => {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="flex justify-between items-center">
                <span>${task.title} - Priority: ${task.priority} - Due date: ${task.dueDate}</span>
                <button onclick="deleteTask(${index})" class="ml-4 bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
};
