import "./date_navigator.css";

export default function DateNavigator({ currentDate, onChangeDate, onGoToToday }) {
  return (
    <div className="date-nav">
      <button onClick={() => onChangeDate(-1)}>←</button>
      <button onClick={onGoToToday}>Сегодня</button>
      <button onClick={() => onChangeDate(1)}>→</button>
    </div>
  );
}