import { useEffect, useState } from "react";

export default function useCountdown() {
  const [secondsLeft, setSecoundsLeft] = useState(0);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timeout = setTimeout(() => {
      setSecoundsLeft(secondsLeft - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [secondsLeft]);

  function start(seconds) {
    setSecoundsLeft(seconds);
  }

  return { secondsLeft, start };
}
