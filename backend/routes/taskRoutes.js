const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Get all tasks / Search / Filter
router.get('/', async (req, res) => {
  try {
    const { search, status, priority } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (status && status !== 'All') {
      query.status = status;
    }
    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new task
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Edit an existing task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AI Feature: Groq LLM Task Breakdown & Suggestions
router.post('/ai-suggest', async (req, res) => {
  try {
    const { prompt } = req.body;
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert executive project manager. Given a project goal or task description, break it down into 3-5 professional, actionable sub-tasks with estimated priorities (Low, Medium, High). Format output clearly as plain text or JSON list.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama3-70b-8192',
    });

    res.json({ suggestion: chatCompletion.choices[0]?.message?.content || 'No suggestions generated.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;