import { useState, useEffect } from "react";
import "./App.css";
import DateToday from "./components/date_today/date_today.jsx";
import TaskInput from "./components/task_input/task_input.jsx";
import TaskList from "./components/task_list/task_list.jsx";
import TaskSummary from "./components/task_summary/task_summary.jsx";
import TaskFilters from "./components/task_filters/task_filters.jsx"; // ← новый импорт
import Logo from "./components/logo/logo.jsx";
import DateNavigator from "./components/date_navigator/date_navigator.jsx";

function App() {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const [tasksByDate, setTasksByDate] = useState(() => {
    const saved = localStorage.getItem("tasksByDate");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          const cleaned = {};
          Object.keys(parsed).forEach((key) => {
            if (Array.isArray(parsed[key])) {
              cleaned[key] = parsed[key];
            }
          });
          return cleaned;
        }
      } catch (e) {
        console.error("localStorage повреждён → начинаем заново", e);
      }
    }
    return { [todayStr]: [] };
  });

  const [currentDate, setCurrentDate] = useState(todayStr);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasksByDate", JSON.stringify(tasksByDate));
  }, [tasksByDate]);

  const getTasksForCurrentDate = () => {
    const tasksForDay = tasksByDate[currentDate];
    return Array.isArray(tasksForDay) ? tasksForDay : [];
  };

  const setTasksForCurrentDate = (updater) => {
    setTasksByDate((prev) => {
      const currentTasks = getTasksForCurrentDate();
      const newTasks =
        typeof updater === "function" ? updater(currentTasks) : updater;
      return { ...prev, [currentDate]: newTasks };
    });
  };

  const addTask = (newText) => {
    if (!newText || newText.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: newText.trim(),
      isDone: false,
      priority: "medium",
      createdAt: new Date().toISOString(),
    };

    if (currentDate < todayStr) {
      alert("Нельзя добавлять задачи в прошлом");
      return;
    }

    setTasksForCurrentDate((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasksForCurrentDate((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, isDone: !t.isDone } : t,
      );
      const active = updated.filter((t) => !t.isDone);
      const completed = updated.filter((t) => t.isDone);
      return [...active, ...completed];
    });
  };

  const deleteTask = (id) => {
    setTasksForCurrentDate((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (id, newText) => {
    if (!newText.trim()) return;
    setTasksForCurrentDate((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText.trim() } : t)),
    );
  };

  const changePriority = (id, newPriority) => {
    setTasksForCurrentDate((prev) =>
      prev.map((t) => (t.id === id ? { ...t, priority: newPriority } : t)),
    );
  };

  const changeDate = (direction) => {
    const curr = new Date(currentDate);
    curr.setDate(curr.getDate() + direction);
    setCurrentDate(curr.toISOString().split("T")[0]);
  };

  const goToToday = () => setCurrentDate(todayStr);

  const currentTasks = getTasksForCurrentDate();
  const isPast = currentDate < todayStr;

  // Фильтрация
  const filteredTasks = currentTasks.filter((t) => {
    if (filter === "active") return !t.isDone;
    if (filter === "completed") return t.isDone;
    return true;
  });

  // Сортировка: сначала активные (по приоритету), потом выполненные
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.isDone !== b.isDone) {
      return a.isDone ? 1 : -1;
    }
    const prioOrder = { high: 0, medium: 1, low: 2 };
    const prioA = prioOrder[a.priority] ?? 1;
    const prioB = prioOrder[b.priority] ?? 1;
    return prioA - prioB;
  });

  const total = currentTasks.length;
  const done = currentTasks.filter((t) => t.isDone).length;
  const remaining = total - done;

  return (
    <div className="App">
      <header className="logo-header">
        <div className="header-top-row">
          <div className="left-part">
            <Logo size={56} color="#808080" />
            <div className="slogan-box">
              <h1>TODO</h1>
              <span className="slogan">И твои планы под контролем!</span>
            </div>
          </div>

          <div className="right-part">
            <DateToday dateStr={currentDate} />
            <DateNavigator
              currentDate={currentDate}
              onChangeDate={changeDate}
              onGoToToday={goToToday}
            />
          </div>
        </div>
      </header>

      <div className="date-block-mobile">
        <DateToday dateStr={currentDate} />
        <DateNavigator
          currentDate={currentDate}
          onChangeDate={changeDate}
          onGoToToday={goToToday}
        />
      </div>

      <section className="input-section">
        {isPast ? (
          <p className="past-notice">
            Это прошлый день — добавление задач невозможно
          </p>
        ) : (
          <TaskInput onAddTask={addTask} />
        )}
      </section>

      <section className="task-list-section">
        <div className="tasks-header">
          <TaskSummary total={total} done={done} remaining={remaining} />

          {!isPast && (
            <TaskFilters currentFilter={filter} onFilterChange={setFilter} />
          )}
        </div>

        <TaskList
          tasks={sortedTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
          onChangePriority={changePriority}
          isPast={isPast}
        />
      </section>
    </div>
  );
}

export default App;
