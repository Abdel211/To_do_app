const express = require('express');
const app = express();
const port = 3000;

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Servir les fichiers statiques du dossier 'public'
app.use(express.static('public'));

// Tableau des tâches
let tasks = [];

// Route GET pour récupérer les tâches
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Route POST pour ajouter une tâche
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        category: req.body.category,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Route PUT pour marquer une tâche comme terminée
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (task) {
        task.completed = true;
        res.json(task);
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

// Route DELETE pour supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.status(204).send();
});

// Démarrer le serveur
app.listen(port, '0.0.0.0', () => {
    console.log(`Application To-Do en cours d'exécution`);
});
