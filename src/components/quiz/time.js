import React, { useEffect, useState } from "react";

const Time = (stop) => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((seconds) => seconds + 1);
    }, 1000);

    if(stop) return () => clearInterval(interval);
  }, [stop]);
  
  const makeTimeReadable = (t) => {
    const timeInSec = t;
    const hours = Math.floor(timeInSec / 3600);
    const mins = Math.floor((timeInSec - hours * 3600) / 60);

    const secs = timeInSec - hours * 3600 - mins * 60;
    return `${checkTwoDigits(mins)}:${checkTwoDigits(secs)} `;
  };
  const checkTwoDigits = (t) => {
    if (t < 10) {
      return "0" + t;
    }
    return t;
  };
  return <span>{makeTimeReadable(time)}</span>
};

export default Time;
