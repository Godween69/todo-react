import "./task_input.css";
import { useState } from "react";

export default function TaskInput({ onAddTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = task.trim();
    if (trimmed === "") return;

    onAddTask(trimmed);
    setTask("");
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        className="input-field"
        type="text"
        placeholder="Сформулируйте и введите задачу..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            handleSubmit(e);
          }
        }}
      />
      <button
        className="add-button"
        type="submit"
        aria-label="Добавить задачу"
      >
        +
      </button>
    </form>
  );
}