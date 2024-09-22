export const getTasksFromLocalStorage = (listName = 'Ma Journée') => {
    return JSON.parse(localStorage.getItem(listName)) || [];
};

export const saveTasksToLocalStorage = (listName, tasks) => {
    localStorage.setItem(listName, JSON.stringify(tasks));
};
