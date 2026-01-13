import React from "react";

const TaskList = ({ tasks, role, onUpdateStatus }) => {
  if (tasks.length === 0) return <p>No tasks available</p>;

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Task</th>
          <th>Created By</th>
          <th>Status</th>
          {role === "manager" && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.createdBy}</td>
            <td>{task.status}</td>

           
            {role === "manager" && task.status === "PENDING" && (
              <td>
                <button onClick={() => onUpdateStatus(task.id, "APPROVED")}>
                  Approve
                </button>
                <button onClick={() => onUpdateStatus(task.id, "REJECTED")}>
                  Reject
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
