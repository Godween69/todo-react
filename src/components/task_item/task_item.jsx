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
  const [editText, setEditText] = useState(task?.text || "");

  if (!task) return null;

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

  const taskClass = `task-item ${task.isDone ? "done" : ""} ${
    isPast ? "inactive" : ""
  } ${task.scope === "global" ? "global-task" : ""}`;

  // Форматируем время выполнения
  const completedTime =
    task.isDone && task.completedAt
      ? (() => {
          const start = new Date(task.createdAt);
          const end = new Date(task.completedAt);
          const diffMs = end - start;
          const diffMins = Math.floor(diffMs / 1000 / 60);
          const hours = Math.floor(diffMins / 60);
          const minutes = diffMins % 60;

          if (diffMins < 1) return "менее 1 минуты";
          let result = "";
          if (hours > 0) result += `${hours} ч `;
          if (minutes > 0) result += `${minutes} мин`;
          return result.trim();
        })()
      : null;

  if (task.isDone || isPast) {
    return (
      <div className={taskClass}>
        <div className="priority-dot gray"></div>
        <span className="task-text">{task.text}</span>
        {completedTime && (
          <span className="task-completed-time">Выполнено за: {completedTime}</span>
        )}
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

          <span
            className="task-text"
            onDoubleClick={() => {
              setEditText(task.text || "");
              onEditStart();
            }}
          >
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
