const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task');  // Modèle Mongoose pour les tâches

const app = express();
app.use(express.json());  // Permet de lire les données JSON dans les requêtes

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/todoapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Récupérer toutes les tâches
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Ajouter une nouvelle tâche
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

// Mettre à jour une tâche
app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

// Supprimer une tâche
app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
