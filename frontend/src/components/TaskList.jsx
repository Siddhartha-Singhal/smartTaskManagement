import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete, onToggleStatus, search, setSearch, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter }) => {
  return (
    <div className="card p-4">
      <div className="row g-3 mb-4 align-items-center">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="col-md-2 text-end text-muted small">
          Total: {tasks.length}
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark text-uppercase small">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No task records found.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task._id}>
                  <td>
                    <div className="fw-bold">{task.title}</div>
                    <div className="text-muted small text-truncate" style={{ maxWidth: '250px' }}>
                      {task.description}
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-secondary fw-normal">{task.category}</span>
                  </td>
                  <td>
                    <span className={`badge ${
                      task.priority === 'High' ? 'bg-danger' : task.priority === 'Medium' ? 'bg-warning text-dark' : 'bg-info text-dark'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="small text-muted">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    <span className={`badge ${task.status === 'Completed' ? 'bg-success' : 'bg-secondary'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-dark me-1"
                      onClick={() => onToggleStatus(task)}
                      title="Toggle Status"
                    >
                      <i className={`bi ${task.status === 'Completed' ? 'bi-arrow-counterclockwise' : 'bi-check-lg'}`}></i>
                      {task.status === 'Completed' ? ' Reopen' : ' Complete'}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => onEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;