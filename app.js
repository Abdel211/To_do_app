const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let tasks = [
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
        category: req.body.category, 
        priority: req.body.priority, 
        dueDate: req.body.dueDate,
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
        res.status(404).send('Task not Found');
    }
});

// Supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.status(204).send();
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Application To-Do exécuted on http://0.0.0.0:${port}`);
});
