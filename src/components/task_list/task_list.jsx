import { useState, Fragment } from "react";
import TaskItem from "../task_item/task_item.jsx";

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  onChangePriority,
  onToggleScope,
  isPast = false,
}) {
  const [editingTaskId, setEditingTaskId] = useState(null);

  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const completedCount = safeTasks.filter((t) => t.isDone).length;
  const firstCompletedIndex = safeTasks.findIndex((t) => t.isDone);

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
      {safeTasks.map((task, idx) => (
        <Fragment key={task.id}>
          {completedCount > 0 && idx === firstCompletedIndex && (
            <div className="completed-label">
              Выполнено: {completedCount}
            </div>
          )}
          <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={(id, newText) => {
              onEdit(id, newText);
              setEditingTaskId(null);
            }}
            onChangePriority={onChangePriority}
            onToggleScope={onToggleScope}
            isEditing={editingTaskId === task.id}
            onEditStart={() => setEditingTaskId(task.id)}
            onEditCancel={() => setEditingTaskId(null)}
            isPast={isPast}
          />
        </Fragment>
      ))}
    </div>
  );
}
