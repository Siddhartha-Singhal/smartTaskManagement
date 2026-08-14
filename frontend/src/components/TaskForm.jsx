import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, currentTask, clearCurrentTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'General',
    dueDate: ''
  });

  useEffect(() => {
    if (currentTask) {
      setTask({
        ...currentTask,
        dueDate: currentTask.dueDate ? currentTask.dueDate.substring(0, 10) : ''
      });
    }
  }, [currentTask]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log('Submitting task:', task);

  try {
    await onSave(task);

    console.log('Task saved successfully');

    setTask({
      title: '',
      description: '',
      priority: 'Medium',
      category: 'General',
      dueDate: ''
    });
  } catch (error) {
    console.error('Failed to save task:', error);
  }
};

  return (
    <div className="card mb-4 p-4 border-top border-primary border-3">
      <h5 className="card-title fw-bold mb-3 text-dark">
        {currentTask ? 'Edit Task Record' : 'Create New Task'}
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label text-muted small fw-bold">Task Title</label>
            <input
              type="text"
              className="form-control"
              required
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="e.g., Q3 Financial Audit"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label text-muted small fw-bold">Priority</label>
            <select
              className="form-select"
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label text-muted small fw-bold">Category</label>
            <input
              type="text"
              className="form-control"
              value={task.category}
              onChange={(e) => setTask({ ...task, category: e.target.value })}
              placeholder="e.g., Finance"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label text-muted small fw-bold">Description</label>
            <textarea
              className="form-control"
              rows="2"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              placeholder="Enter task scope and objectives..."
            ></textarea>
          </div>
          <div className="col-md-3">
            <label className="form-label text-muted small fw-bold">Due Date</label>
            <input
              type="date"
              className="form-control"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button type="submit" className="btn btn-dark w-100 fw-semibold">
              {currentTask ? 'Update Task' : 'Save Task'}
            </button>
            {currentTask && (
              <button
                type="button"
                className="btn btn-outline-secondary ms-2"
                onClick={() => {
                  clearCurrentTask();
                  setTask({ title: '', description: '', priority: 'Medium', category: 'General', dueDate: '' });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;