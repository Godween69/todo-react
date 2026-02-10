export default function TaskFilters({ currentFilter, onFilterChange }) {
  const base =
    "btn btn-pill max-[720px]:px-3 max-[720px]:text-[0.9rem] max-[480px]:px-2.5 max-[480px]:text-[0.85rem]";
  const active = "btn-primary";
  const idle = "btn-ghost";

  return (
    <div className="my-3 flex flex-wrap justify-center gap-3 max-[720px]:my-2.5 max-[720px]:gap-2 max-[480px]:gap-1.5">
      <button
        className={`${base} ${currentFilter === "all" ? active : idle}`}
        onClick={() => onFilterChange("all")}
      >
        Все
      </button>
      <button
        className={`${base} ${currentFilter === "active" ? active : idle}`}
        onClick={() => onFilterChange("active")}
      >
        Активные
      </button>
      <button
        className={`${base} ${currentFilter === "completed" ? active : idle}`}
        onClick={() => onFilterChange("completed")}
      >
        Выполненные
      </button>
    </div>
  );
}
