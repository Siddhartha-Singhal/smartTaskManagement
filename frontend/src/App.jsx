import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import AiAssistant from './components/AiAssistant';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const fetchTasks = useCallback(async () => {
  try {
    const res = await axios.get('/api/tasks', {
      params: {
        search,
        status: statusFilter,
        priority: priorityFilter
      }
    });

    setTasks(res.data);
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
  }
}, [search, statusFilter, priorityFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSave = async (taskData) => {
  try {
    console.log('Saving task:', taskData);

    let response;

    if (currentTask) {
      response = await axios.put(
        `/api/tasks/${currentTask._id}`,
        taskData
      );
    } else {
      response = await axios.post(
        '/api/tasks',
        taskData
      );
    }

    console.log('Task saved:', response.data);

    setCurrentTask(null);
    await fetchTasks();

    return response.data;
  } catch (err) {
    console.error('Failed to save task:', err);
    throw err;
  }
};

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task record?')) {
      try {
        await axios.delete(`/api/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const updatedStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
      await axios.put(`/api/tasks/${task._id}`, { status: updatedStatus });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container py-4">
        <AiAssistant />
        <TaskForm 
          onSave={handleSave} 
          currentTask={currentTask} 
          clearCurrentTask={() => setCurrentTask(null)} 
        />
        <TaskList 
          tasks={tasks}
          onEdit={(task) => setCurrentTask(task)}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
      </div>
    </div>
  );
}

export default App;