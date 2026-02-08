// src/components/task_filters/task_filters.jsx
import "./task_filters.css";

export default function TaskFilters({ currentFilter, onFilterChange }) {
  return (
    <div className="filters">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => onFilterChange("all")}
      >
        Все
      </button>
      <button
        className={currentFilter === "active" ? "active" : ""}
        onClick={() => onFilterChange("active")}
      >
        Активные
      </button>
      <button
        className={currentFilter === "completed" ? "active" : ""}
        onClick={() => onFilterChange("completed")}
      >
        Выполненные
      </button>
    </div>
  );
}