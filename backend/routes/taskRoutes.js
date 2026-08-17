const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Groq = require('groq-sdk');
 
// AI Feature: Groq LLM Task Breakdown & Suggestions
// MUST remain above router.post('/')
router.post('/ai-suggest', async (req, res) => {
  try {
    const { prompt } = req.body;
 
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
 
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not defined in environment variables.');
      return res.status(500).json({ error: 'Server configuration error: Missing API key' });
    }
 
    // Initialize Groq inside the handler to prevent server crashes on startup
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
 
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are an expert executive project manager. Given a project goal or task description, break it down into 3-5 professional, actionable sub-tasks with estimated priorities (Low, Medium, High). Format output clearly as plain text.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
    });
 
    const suggestion =
      chatCompletion.choices[0]?.message?.content ||
      'No suggestions generated.';
 
    res.json({ suggestion });
 
  } catch (err) {
    console.error('Groq AI error:', err);
    res.status(500).json({
      error: 'Failed to generate AI suggestion',
      details: err.message
    });
  }
});
 
// General CRUD Routes
router.get('/', async (req, res) => {
  try {
    const { search, status, priority } = req.query;
    let query = {};
 
    if (search) query.title = { $regex: search, $options: 'i' };
    if (status && status !== 'All') query.status = status;
    if (priority && priority !== 'All') query.priority = priority;
 
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
module.exports = router;