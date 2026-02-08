// src/components/task_summary/task_summary.jsx
import "./task_summary.css";

export default function TaskSummary({ total, done, remaining }) {
  return (
    <div className="tasks-summary">
      {total} задач • {done} выполнено • {remaining} осталось
    </div>
  );
}