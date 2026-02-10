export default function DateNavigator({ onChangeDate, onGoToToday }) {
  const btnClass =
    "btn btn-ghost btn-sm max-[720px]:px-2 max-[720px]:text-[12px] max-[480px]:px-1.5 max-[480px]:text-[11px]";

  return (
    <div className="flex gap-2 max-[720px]:gap-1.5">
      <button
        className={btnClass}
        onClick={() => onChangeDate(-1)}
      >
        ←
      </button>
      <button
        className={btnClass}
        onClick={onGoToToday}
      >
        Сегодня
      </button>
      <button
        className={btnClass}
        onClick={() => onChangeDate(1)}
      >
        →
      </button>
    </div>
  );
}
