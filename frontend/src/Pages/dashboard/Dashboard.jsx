import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext";
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const [taskTitle, setTaskTitle] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newRole, setNewRole] = useState("employee");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: taskTitle,
        createdBy: user.username,
        status: "PENDING"
      }
    ]);
    setTaskTitle("");
  };

  const updateStatus = (id, status) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const addUser = (e) => {
    e.preventDefault();
    if (!newUsername.trim()) return;

    setUsers([
      ...users,
      { id: Date.now(), username: newUsername, role: newRole }
    ]);

    setNewUsername("");
    setNewRole("employee");
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="dashboard-main">
  <h2 className="dashboard-title">Enterprise Workflow Dashboard</h2>
      <div className="dashboard-container">
        <h3 className="user-info">
          User: {user.username} {user.role.toUpperCase()}
        </h3>

        {(user.role === "admin" || user.role === "manager") && (
          <>
            <h4>Add Task</h4>
            <form className="task-form" onSubmit={addTask}>
              <input
                value={taskTitle}
                placeholder="Task title"
                onChange={(e) => setTaskTitle(e.target.value)}
                className="task-input"
              />
              <button className="btn add-btn">Add</button>
            </form>
          </>
        )}

        <h4>Tasks</h4>
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Created By</th>
              <th>Status</th>
              {user.role === "manager" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.createdBy}</td>
                <td>{task.status}</td>

   {user.role === "manager" && (
  <td>
    {task.status === "PENDING" ? (
      <>
        <button
          className="btn approve-btn"
          onClick={() => updateStatus(task.id, "APPROVED")}
        >
          Approve
        </button>
        <button
          className="btn reject-btn"
          onClick={() => updateStatus(task.id, "REJECTED")}
        >
          Reject
        </button>
      </>
    ) : (
      "-"
    )}
  </td>
)}


               
              </tr>
            ))}

          </tbody>
        </table>

        {user.role === "admin" && (
          <>
            <h4>Employee Details</h4>

            <form className="user-form" onSubmit={addUser}>
              <input
                placeholder="Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="user-input"
              />
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="user-select"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
              <button className="btn add-btn">Add User</button>
            </form>

            <table className="users-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.username}</td>
                    <td>{u.role}</td>
                    <td>
                      <button
                        className="btn delete-btn"
                        onClick={() => deleteUser(u.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
