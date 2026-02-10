import { useState } from "react";
import TaskItem from "../task_item/task_item.jsx";
import "../task_item/task_item.css"; // ← путь к CSS task_item

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  onChangePriority,
  onToggleScope, // ← получаем прокиданный toggle
  isPast = false,
}) {
  const [editingTaskId, setEditingTaskId] = useState(null);

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  if (safeTasks.length === 0) {
    return (
      <div className="task-list">
        <p className="empty-message">
          {isPast ? "Задач не было..." : "Пока задач нет..."}
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {safeTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={(id, newText) => {
            onEdit(id, newText);
            setEditingTaskId(null);
          }}
          onChangePriority={onChangePriority}
          onToggleScope={onToggleScope} // ← передаем toggle
          isEditing={editingTaskId === task.id}
          onEditStart={() => setEditingTaskId(task.id)}
          onEditCancel={() => setEditingTaskId(null)}
          isPast={isPast}
        />
      ))}
    </div>
  );
}
