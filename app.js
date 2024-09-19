const express = require('express');
const path = require('path'); // Ajoute ceci pour gérer les chemins
const app = express();
const port = 3000;

app.use(express.json());

// Indique à Express où trouver les fichiers statiques (public)
app.use(express.static(path.join(__dirname, 'public')));

// Route pour servir `index.html` lors de la requête racine "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let tasks = [];

// Fonction pour vérifier si la tâche est importante (si priorité est "High")
function checkIfImportant(priority) {
    return priority === 'High';
}

// Fonction pour vérifier si la tâche est planifiée pour aujourd'hui
function checkIfPlanned(dueDate) {
    const today = new Date().toISOString().split('T')[0]; // Obtenez la date actuelle sous format YYYY-MM-DD
    return dueDate === today;
}

// Route POST pour ajouter une tâche
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        category: req.body.category,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
        isImportant: checkIfImportant(req.body.priority), // Marquer comme important si priorité "High"
        isPlanned: checkIfPlanned(req.body.dueDate), // Marquer comme planifié si la date est aujourd'hui
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Route GET pour récupérer toutes les tâches
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Route GET pour récupérer les tâches importantes
app.get('/tasks/important', (req, res) => {
    const importantTasks = tasks.filter(task => task.isImportant);
    res.json(importantTasks);
});

// Route GET pour récupérer les tâches planifiées
app.get('/tasks/planned', (req, res) => {
    const plannedTasks = tasks.filter(task => task.isPlanned);
    res.json(plannedTasks);
});

// Route GET pour récupérer les tâches complétées
app.get('/tasks/completed', (req, res) => {
    const completedTasks = tasks.filter(task => task.completed);
    res.json(completedTasks);
});

// Route PUT pour marquer une tâche comme terminée
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (task) {
        task.completed = true;
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Route DELETE pour supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
