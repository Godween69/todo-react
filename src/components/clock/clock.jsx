import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [hours, minutes] = time.split(":");

  return (
    <div className="flex items-center justify-center px-3 text-[40px] font-semibold text-amber-500 max-[720px]:text-[20px] max-[480px]:text-[18px]">
      <span className="tabular-nums [text-shadow:0_3px_8px_rgba(0,0,0,0.2)]">
        {hours}
        <span className="animate-blink">:</span>
        {minutes}
      </span>
    </div>
  );
}
