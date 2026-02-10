export default function TaskActions({
  onToggle,
  onDelete,
  isEditing,
  // onEditStart,
}) {
  // Если задача уже в режиме редактирования — ничего не показываем (кнопки скрыты)
  if (isEditing) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn-solid btn-solid-success max-[720px]:px-2.5 max-[720px]:py-1 max-[720px]:text-[0.85rem]"
        onClick={onToggle}
        title="Отметить как выполненную"
      >
        Готово!
      </button>

      <button
        className="btn-solid btn-solid-danger btn-solid-icon max-[720px]:h-7 max-[720px]:w-7 max-[720px]:text-[1.1rem]"
        onClick={onDelete}
        title="Удалить задачу"
      >
        ×
      </button>

    </div>
  );
}
