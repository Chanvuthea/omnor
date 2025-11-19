import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<{ targetDate: Date }> = ({
  targetDate,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h2 className=" font-bold text-2xl">Countdown Timer</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {timeLeft.days}
          </div>
          <div>ថ្ងៃ</div>
        </div>
        <div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {timeLeft.hours}
          </div>
          <div>ម៉ោង</div>
        </div>
        <div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {timeLeft.minutes}
          </div>
          <div>នាទី</div>
        </div>
        <div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {timeLeft.seconds}
          </div>
          <div>វិនាទី</div>
        </div>
      </div>
    </div>
  );
};

// Exampl
