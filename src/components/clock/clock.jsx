import { useState, useEffect } from "react";
import "./clock.css";

export default function Clock() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="clock">
      <span className="clock-time">{time}</span>
    </div>
  );
}
