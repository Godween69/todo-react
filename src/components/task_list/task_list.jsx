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
  const listBase =
    "mx-auto w-full max-w-[600px] rounded-lg py-5 min-h-[160px] max-[720px]:py-3 max-[480px]:min-h-[120px]";

  if (safeTasks.length === 0) {
    return (
      <div className={`${listBase} flex items-center justify-center`}>
        <p className="m-0 px-5 py-10 text-center italic text-zinc-400">
          {isPast ? "Задач не было..." : "Пока задач нет..."}
        </p>
      </div>
    );
  }

  return (
    <div className={`${listBase} flex flex-col`}>
      {safeTasks.map((task, idx) => (
        <Fragment key={task.id}>
          {completedCount > 0 && idx === firstCompletedIndex && (
            <div className="my-3 rounded-lg bg-zinc-100/70 px-3 py-2 text-center text-[1.1rem] font-medium text-zinc-600 max-[720px]:my-2 max-[480px]:text-[1rem]">
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
