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
    <div className="flex flex-col px-2.5 py-2.5">
      <p className="text-[18px] font-normal text-black max-[720px]:text-[16px] max-[480px]:text-[15px]">
        {fullDate}
      </p>
      <p className="text-[16px] font-light text-amber-500 max-[720px]:text-[14px] max-[480px]:text-[13px]">
        {weekday}
      </p>
    </div>
  );
}

export default DateToday;
