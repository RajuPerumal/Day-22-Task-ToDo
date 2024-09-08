import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS

const App = () => {
  // State to manage tasks
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All"); // Filter status (All, Completed, Not Completed)

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ id: null, name: "", description: "", status: "Not Completed" });

  // State to manage form inputs
  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  // Add new todo
  const addTodo = () => {
    if (todoName && todoDescription) {
      const newTodo = {
        id: Date.now(),
        name: todoName,
        description: todoDescription,
        status: "Not Completed", // Default status
      };
      setTodos([...todos, newTodo]);
      setTodoName(""); // Reset input fields
      setTodoDescription("");
    }
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Open the modal to edit a todo
  const openEditModal = (todo) => {
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  // Save edited todo
  const saveEditTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === currentTodo.id
        ? { ...todo, name: currentTodo.name, description: currentTodo.description }
        : todo
    );
    setTodos(updatedTodos);
    setIsModalOpen(false); // Close modal
  };

  // Update task name and description in the modal
  const handleChange = (e) => {
    setCurrentTodo({ ...currentTodo, [e.target.name]: e.target.value });
  };

  // Update the status of a todo
  const updateStatus = (todoId, newStatus) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  // Filter todos by status
  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Completed") return todo.status === "Completed";
    if (filter === "Not Completed") return todo.status === "Not Completed";
    return true;
  });

  return (
    <div id="webcrumbs" className="container py-5">
      <div className="bg-light rounded shadow-lg p-4">
        <h1 className="text-center text-primary mb-4">My todo</h1>

        {/* Input Fields */}
        <div className="d-flex justify-content-center mb-4 gap-3">
          <input
            type="text"
            className="form-control w-25"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            placeholder="Todo Name"
          />
          <input
            type="text"
            className="form-control w-25"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
            placeholder="Todo Description"
          />
          <button className="btn btn-primary" onClick={addTodo}>
            Add Todo
          </button>
        </div>

        {/* Filter Todos by Status */}
        <div className="d-flex justify-content-between align-items-center px-4">
          <h2 className="font-weight-bold">My Todos</h2>
          <div>
            <span>Status Filter: </span>
            <div className="dropdown d-inline-block">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {filter}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a className="dropdown-item" onClick={() => setFilter("All")}>
                    All
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={() => setFilter("Completed")}>
                    Completed
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={() => setFilter("Not Completed")}>
                    Not Completed
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="row mt-4">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <div key={todo.id} className="col-md-4 mb-3">
                <div className="bg-success bg-opacity-25 p-4 rounded">
                  <p>
                    <strong>Name :</strong> {todo.name}
                  </p>
                  <p>
                    <strong>Description :</strong> {todo.description}
                  </p>
                  <p>
                    <strong>Status :</strong>
                    <div className="dropdown d-inline-block">
                      <button
                        className={`btn btn-sm dropdown-toggle ${todo.status === "Completed" ? "btn-success" : "btn-warning"}`}
                        type="button"
                        id="statusDropdownButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {todo.status}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="statusDropdownButton">
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={() => updateStatus(todo.id, "Completed")}
                          >
                            Completed
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={() => updateStatus(todo.id, "Not Completed")}
                          >
                            Not Completed
                          </a>
                        </li>
                      </ul>
                    </div>
                  </p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={() => openEditModal(todo)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </div>

        {/* Edit Modal */}
        {isModalOpen && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Todo</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Task Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={currentTodo.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Task Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={currentTodo.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={saveEditTodo}>
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default App