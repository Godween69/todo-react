import { useState } from "react";
import "./task_item.css";

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
  onChangePriority,
  onToggleScope,
  isEditing,
  onEditStart,
  onEditCancel,
  isPast = false,
}) {
  if (!task) return null; // ← безопасная проверка

  const [editText, setEditText] = useState(task.text || "");

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed === "") {
      onEditCancel();
      return;
    }
    onEdit(task.id, trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") onEditCancel();
  };

  const taskClass = `task-item ${task.isDone ? "done" : ""} ${isPast ? "inactive" : ""} ${task.scope === "global" ? "global-task" : ""}`;

  if (task.isDone || isPast) {
    return (
      <div className={taskClass}>
        <div className="priority-dot gray"></div>
        <span className="task-text">{task.text}</span>
      </div>
    );
  }

  return (
    <div className={taskClass}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="edit-input"
          />
          <div className="buttons">
            <button className="save-btn" onClick={handleSave}>
              Сохранить
            </button>
            <button className="cancel-btn" onClick={onEditCancel}>
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className="view-mode">
          {/* Toggle Switch */}
          <div className="switch-wrapper">
            <label className="switch">
              <input
                type="checkbox"
                checked={task.scope === "global"}
                onChange={() => onToggleScope(task.id)}
              />
              <span className="slider"></span>
            </label>
            <span className="switch-label">
              {task.scope === "global" ? "Global" : "Local"}
            </span>
          </div>

          <span className="task-text" onDoubleClick={onEditStart}>
            {task.text}
          </span>
          <div className={`priority-dot ${task.priority || "medium"}`}></div>

          <div className="priority-selector">
            <select
              value={task.priority || "medium"}
              onChange={(e) => onChangePriority(task.id, e.target.value)}
            >
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
          </div>


          <div className="actions">
            <button
              className="complete-btn"
              onClick={() => onToggle(task.id)}
              title="Отметить как выполненную"
            >
              Готово!
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(task.id)}
              title="Удалить задачу"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
