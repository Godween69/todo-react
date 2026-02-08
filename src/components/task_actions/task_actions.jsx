import "./task_actions.css";

export default function TaskActions({
  onToggle,
  onDelete,
  isEditing,
  // onEditStart,
}) {
  // Если задача уже в режиме редактирования — ничего не показываем (кнопки скрыты)
  if (isEditing) return null;

  return (
    <div className="task-actions">
      <button
        className="complete-btn"
        onClick={onToggle}
        title="Отметить как выполненную"
      >
        Готово!
      </button>

      <button
        className="delete-btn"
        onClick={onDelete}
        title="Удалить задачу"
      >
        ×
      </button>

    </div>
  );
}