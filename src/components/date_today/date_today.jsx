import "./date_today.css";

function DateToday({ dateStr }) {
  const date = dateStr ? new Date(dateStr) : new Date();

  const weekday = date.toLocaleDateString("ru-RU", {
    weekday: "long",
  });

  const fullDate = date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="date-today">
      <p className="full-date">{fullDate}</p>
      <p className="weekday">{weekday}</p>
    </div>
  );
}

export default DateToday;
