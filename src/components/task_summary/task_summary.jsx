export default function TaskSummary({ total, done, remaining }) {
  return (
    <div className="my-4 rounded-lg bg-zinc-100/70 px-3 py-2 text-center text-[1.1rem] font-medium text-zinc-600 max-[720px]:my-3 max-[480px]:text-[1rem]">
      {total} задач • {done} выполнено • {remaining} осталось
    </div>
  );
}
