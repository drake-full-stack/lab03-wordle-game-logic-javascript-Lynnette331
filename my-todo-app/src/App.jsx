import {useState} from "react";

function App() {

  // ===use state variables =====
  const [tasks, setTasks] = useState([
    "Project 1", 
    "Laundry", 
    "Walk Dogs",
    "clean room"]);
    const [inputValue, setInputValue] = useState("");
  
    //-======Functions==========
    const handleAddTask = (e) => {
      e.preventDefault();
      if (inputValue.trim()) {
        setTasks([...tasks, inputValue]);
        setInputValue("");
      }
    };

    return (
      <div className="container">
        <h1>My To-Do List</h1>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task"
            className="task-input"
          />
          <button type="submit" className="add-task-button">Add Task</button>
        </form>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <span className="task-text">{task}</span>
              <button
                className="delete-task-button"
            <li key={index} className="task-item">
              {task}
            </li>
          ))}
        </ul>
      </div>
    );

}

export default App;