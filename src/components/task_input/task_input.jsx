import { useState } from "react";

export default function TaskInput({ onAddTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = task.trim();
    if (trimmed === "") return;

    onAddTask(trimmed);
    setTask("");
  };

  return (
    <form
      className="mx-5 my-5 flex w-full max-w-[600px] items-center gap-2.5 max-[720px]:mx-0 max-[720px]:my-3 max-[720px]:w-full max-[720px]:px-3 max-[480px]:flex-col max-[480px]:items-stretch max-[480px]:gap-2"
      onSubmit={handleSubmit}
    >
      <input
        className="h-10 w-full rounded-xl border border-zinc-300 px-3 py-1.5 text-[17px] outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 max-[720px]:h-9 max-[720px]:text-[16px] max-[480px]:h-[34px] max-[480px]:text-[15px]"
        type="text"
        placeholder="Сформулируйте и введите задачу..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            handleSubmit(e);
          }
        }}
      />
      <button
        className="btn-solid btn-solid-success btn-solid-icon text-[26px] leading-none max-[480px]:h-9 max-[480px]:w-9 max-[480px]:self-end"
        type="submit"
        aria-label="Добавить задачу"
      >
        +
      </button>
    </form>
  );
}
