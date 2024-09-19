const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let tasks = [
    { id: 1, title: "Apprendre Docker", completed: false },
    { id: 2, title: "Créer une application To-Do", completed: false }
];

// Obtenir toutes les tâches
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Ajouter une nouvelle tâche
app.post('/tasks', (req, res) => {
    const newTask = { 
        id: tasks.length + 1, 
        title: req.body.title, 
        completed: false 
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Marquer une tâche comme terminée
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (task) {
        task.completed = true;
        res.json(task);
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

// Supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Application To-Do en cours d'exécution sur http://localhost:${port}`);
});
