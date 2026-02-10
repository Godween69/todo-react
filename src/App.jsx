import { useState, useEffect } from "react";
import headerImage from "./assets/header.png";
import DateToday from "./components/date_today/date_today.jsx";
import Clock from "./components/clock/clock.jsx";
import TaskInput from "./components/task_input/task_input.jsx";
import TaskList from "./components/task_list/task_list.jsx";
import TaskSummary from "./components/task_summary/task_summary.jsx";
import TaskFilters from "./components/task_filters/task_filters.jsx";
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
      const currentTasks = Array.isArray(prev[currentDate])
        ? prev[currentDate]
        : [];
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
      completedAt: null, // добавляем поле для времени завершения
      scope: "local",
    };

    if (currentDate < todayStr) {
      alert("Нельзя добавлять задачи в прошлом");
      return;
    }

    setTasksForCurrentDate((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasksForCurrentDate((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const isNowDone = !t.isDone;
        return {
          ...t,
          isDone: isNowDone,
          completedAt: isNowDone ? new Date().toISOString() : null,
        };
      }),
    );
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

  const toggleScope = (id) => {
    setTasksForCurrentDate((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, scope: t.scope === "global" ? "local" : "global" }
          : t,
      ),
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

  const filteredTasks = currentTasks.filter((t) => {
    if (filter === "active") return !t.isDone;
    if (filter === "completed") return t.isDone;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.isDone !== b.isDone) return a.isDone ? 1 : -1;
    const prioOrder = { high: 0, medium: 1, low: 2 };
    return (prioOrder[a.priority] ?? 1) - (prioOrder[b.priority] ?? 1);
  });

  const total = currentTasks.length;
  const done = currentTasks.filter((t) => t.isDone).length;
  const remaining = total - done;

  return (
    <div className="mx-auto mt-4 max-w-[680px] px-3 max-[720px]:mt-0 max-[720px]:px-0">
      <div className="rounded-[26px] bg-gradient-to-br from-white/80 via-sky-100/70 to-amber-100/70 p-[1px] shadow-[0_30px_70px_-35px_rgba(15,23,42,0.45)] ring-1 ring-white/70 max-[720px]:rounded-none">
        <div className="min-h-[calc(100vh-1rem)] overflow-hidden rounded-[25px] bg-white/80 text-[22px] text-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-sm max-[720px]:min-h-screen max-[720px]:rounded-none max-[720px]:bg-white/90 max-[720px]:text-[16px] max-[480px]:text-[15px] motion-safe:animate-rise">
          <header
            className="flex min-h-[180px] flex-col bg-cover bg-center px-6 py-4 pb-3 max-[720px]:min-h-[160px] max-[720px]:px-4 max-[720px]:py-3 max-[480px]:p-3 motion-safe:animate-rise-delayed"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.5)), url(${headerImage})`,
            }}
          >
            <div className="flex w-full items-start justify-between max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-3">
              <div className="flex items-center">
                <Logo size={56} color="#808080" />
                <div className="ml-1 grid">
                  <h1 className="text-[30px] font-extrabold tracking-[0.04em] text-zinc-700 drop-shadow-[0_3px_10px_rgba(0,0,0,0.18)] max-[720px]:text-[25px] max-[480px]:text-[23px]">
                    TODO
                  </h1>
                  <span className="ml-[23px] mt-[-6px] text-[13px] italic text-zinc-600 max-[720px]:ml-3 max-[480px]:text-[12px]">
                    И твои планы под контролем!
                  </span>
                </div>
              </div>
              <Clock />
              <div className="flex flex-col items-end gap-1 max-[720px]:hidden">
                <DateToday dateStr={currentDate} />
                <DateNavigator onChangeDate={changeDate} onGoToToday={goToToday} />
              </div>
            </div>
          </header>

          <div className="hidden flex-col items-start gap-1.5 px-5 pb-2 pt-2 max-[720px]:flex max-[720px]:px-3">
            <DateToday dateStr={currentDate} />
            <DateNavigator onChangeDate={changeDate} onGoToToday={goToToday} />
          </div>

          <section className="motion-safe:animate-rise-delayed">
            {isPast ? (
              <p className="mx-5 rounded-lg bg-zinc-100 px-4 py-5 text-center italic text-zinc-500 max-[480px]:mx-3">
                Это прошлый день — добавление задач невозможно
              </p>
            ) : (
              <TaskInput onAddTask={addTask} />
            )}
          </section>

          <section className="px-2 pb-6 motion-safe:animate-rise-delayed">
            <div className="my-4">
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
              onToggleScope={toggleScope}
              isPast={isPast}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
