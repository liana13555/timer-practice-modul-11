import "./styles/main.scss";

window.onload = () => {
  const clock = document.getElementById("clockdiv");
  const pauseBtn = document.getElementById("pause");
  const resumeBtn = document.getElementById("resume");
  const startBtn = document.getElementById("start");

  // Default values
  const timerMinutes = 10;

  // State
  let timeInterval;
  let timeLeft;
  let paused = false;
  let deadLine;

  const timeRemaining = endDate => {
    let diff = Date.parse(endDate) - Date.parse(new Date());
    let formattedSeconds = diff / 1000;
    let formattedMinutes = diff / 60000;
    let seconds = Math.floor(formattedSeconds % 60);
    let minutes = Math.floor(formattedMinutes % 60);

    return {
      diff,
      seconds,
      minutes
    };
  };

  const startTimer = timeLeft => {
    if (timeLeft) {
      timeInterval = setInterval(tick, 1000);
    } else {
      const currentTime = Date.parse(new Date());
      deadLine = new Date(currentTime + timerMinutes * 60 * 1000);
      timeInterval = setInterval(tick, 1000);
    }
  };

  const tick = () => {
    let getTime = timeRemaining(deadLine);
    let seconds = getTime.seconds;
    let minutes = getTime.minutes;

    let secondsBeautified = seconds.toString().padStart(2, "0");
    let minutesBeautified = minutes.toString().padStart(2, "0");

    clock.innerHTML = `${minutesBeautified}:${secondsBeautified}`;

    if (getTime.diff === 0) {
      clearInterval(timeInterval);
    }
  };

  // tick();

  const pauseTimer = () => {
    if (!paused) {
      paused = true;
      clearInterval(timeInterval);
      timeLeft = timeRemaining(deadLine).diff;
    }
  };

  const resumeTimer = () => {
    if (paused) {
      paused = false;
      deadLine = new Date(Date.parse(new Date()) + timeLeft);
      startTimer(true);
    }
  };

  pauseBtn.addEventListener("click", () => {
    pauseTimer();
  });

  resumeBtn.addEventListener("click", () => {
    resumeTimer();
  });

  startBtn.addEventListener("click", () => {
    startTimer(false);
  });
};
