import { useState, useEffect } from "react";

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
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  useEffect(() => {
    if (!confirmOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") setConfirmOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [confirmOpen]);

  if (!task) return null;

  const baseTaskClass =
    "task-row relative flex items-start gap-3 border-b border-dashed border-zinc-300/70 px-4 py-3 last:border-b-0 max-[720px]:gap-2.5 max-[720px]:px-3 max-[720px]:py-2.5 max-[480px]:px-2.5 max-[480px]:py-2";
  const scopeClass =
    task.scope === "global"
      ? "before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:rounded-r before:bg-sky-500 before:content-['']"
      : "";
  const priorityHoverClass = task.isDone || isPast
    ? ""
    : {
        low: "task-priority-low",
        medium: "task-priority-medium",
        high: "task-priority-high",
      }[task.priority] || "task-priority-medium";
  const inactiveClass =
    task.isDone || isPast ? "pointer-events-none bg-zinc-100 opacity-70" : "";
  const taskClass = [baseTaskClass, scopeClass, priorityHoverClass, inactiveClass]
    .filter(Boolean)
    .join(" ");

  const priorityClass = task.isDone || isPast
    ? "priority-lamp-muted"
    : {
        low: "priority-lamp-low",
        medium: "priority-lamp-medium",
        high: "priority-lamp-high",
      }[task.priority] || "priority-lamp-medium";

  const textClass = [
    "min-w-[220px] flex-1 break-words py-1 text-[1.05rem] leading-[1.4] max-[720px]:min-w-0",
    task.isDone || isPast
      ? "text-zinc-500 line-through"
      : "cursor-pointer text-zinc-800",
  ]
    .filter(Boolean)
    .join(" ");

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
        <div className={`priority-lamp ${priorityClass}`}></div>
        <span className={textClass}>{task.text}</span>
        {completedTime && (
          <span className="ml-auto pl-2 text-[0.75rem] text-zinc-500">
            Выполнено за: {completedTime}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={taskClass}>
      {isEditing ? (
        <div className="flex w-full flex-col gap-3 py-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="min-h-[60px] w-full rounded-lg border-2 border-sky-500 px-4 py-3 text-[1.1rem] leading-[1.5] outline-none"
          />
          <div className="flex justify-end gap-3">
            <button
              className="btn btn-primary min-w-[100px] max-[480px]:min-w-[90px] max-[480px]:px-3 max-[480px]:py-1.5 max-[480px]:text-[0.85rem]"
              onClick={handleSave}
            >
              Сохранить
            </button>
            <button
              className="btn btn-neutral min-w-[100px] max-[480px]:min-w-[90px] max-[480px]:px-3 max-[480px]:py-1.5 max-[480px]:text-[0.85rem]"
              onClick={onEditCancel}
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-wrap items-start gap-4 max-[720px]:gap-3 max-[480px]:gap-2">
          <div className="flex items-start gap-3 min-w-[220px] flex-1 max-[720px]:min-w-0">
            <div className="flex flex-col items-center gap-2">
              <div className={`priority-lamp ${priorityClass} mt-0`}></div>
              <div className="flex flex-col-reverse items-center gap-0.5">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={task.scope === "global"}
                    onChange={() => onToggleScope(task.id)}
                    className="peer sr-only"
                  />
                  <span className="relative h-6 w-12 overflow-hidden rounded-full bg-zinc-300 transition duration-300 peer-checked:bg-sky-500 peer-checked:shadow-[0_0_0_4px_rgba(56,189,248,0.2)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.75),transparent_60%)] before:opacity-0 before:transition before:duration-300 before:content-[''] peer-checked:before:opacity-100 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition after:duration-300 after:ease-out after:content-[''] peer-checked:after:translate-x-6"></span>
                </label>
                <span
                  className={`text-[0.7rem] transition ${
                    task.scope === "global" ? "text-sky-600" : "text-zinc-700"
                  }`}
                >
                  {task.scope === "global" ? "Global" : "Local"}
                </span>
              </div>
            </div>

            <span
              className={textClass}
              onDoubleClick={() => {
                setEditText(task.text || "");
                onEditStart();
              }}
            >
              {task.text}
            </span>
          </div>

          <div className="flex shrink-0 justify-end max-[480px]:w-full max-[480px]:justify-start">
            <div className="inline-grid grid-cols-[max-content_max-content] gap-x-[10px] gap-y-2 max-[480px]:w-full">
              <select
                value={task.priority || "medium"}
                onChange={(e) => onChangePriority(task.id, e.target.value)}
                className="select col-span-2 w-full min-w-0 max-w-full max-[720px]:select-sm"
              >
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
              </select>

              <button
                className="btn-solid btn-solid-success px-3 max-[720px]:px-2.5 max-[720px]:py-1 max-[720px]:text-[0.85rem] max-[480px]:px-2 max-[480px]:text-[0.8rem]"
                onClick={() => onToggle(task.id)}
                title="Отметить как выполненную"
              >
                Готово!
              </button>

              <button
                className="btn-solid btn-solid-danger btn-solid-icon max-[720px]:h-7 max-[720px]:w-7 max-[720px]:text-[1.1rem] max-[480px]:h-[26px] max-[480px]:w-[26px] max-[480px]:text-[1rem]"
                onClick={() => setConfirmOpen(true)}
                title="Удалить задачу"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-[2px]"
          onClick={() => setConfirmOpen(false)}
        >
          <div
            className="w-full max-w-[380px] rounded-2xl bg-white/90 p-5 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.7)] ring-1 ring-white/70"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="text-[1.05rem] font-semibold text-slate-800">
              Удалить задачу?
            </h3>
            <p className="mt-2 text-[0.95rem] text-slate-600">
              Это действие нельзя отменить. Задача будет удалена навсегда.
            </p>
            <div className="mt-4 flex items-center justify-end gap-2.5">
              <button
                className="btn-solid btn-solid-neutral"
                onClick={() => setConfirmOpen(false)}
              >
                Отмена
              </button>
              <button
                className="btn-solid btn-solid-danger"
                onClick={() => {
                  setConfirmOpen(false);
                  onDelete(task.id);
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
