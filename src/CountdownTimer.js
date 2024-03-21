import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [timerActive, setTimerActive] = useState(false);
  const [dateError, setDateError] = useState(null);

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const now = new Date();
    const diffInDays = Math.floor((selectedDate - now) / (1000 * 60 * 60 * 24));

    if (diffInDays > 100) {
      setDateError('Selected time is more than 100 days');
    } else if (selectedDate <= now) {
      setDateError('Selected time is in the past');
    } else {
      setDateError(null);
      setTargetDate(selectedDate);
    }
  };

  useEffect(() => {
    let intervalId;

    // Update the countdown timer every second
    if (timerActive && targetDate) {
      intervalId = setInterval(() => {
        const now = new Date();
        const diffInSeconds = Math.floor((targetDate - now) / 1000);

        if (diffInSeconds <= 0) {
          // Stop the timer when it reaches zero
          setTimerActive(false);
          clearInterval(intervalId);
        } else {
          const days = Math.floor(diffInSeconds / 86400);
          const hours = Math.floor((diffInSeconds % 86400) / 3600);
          const minutes = Math.floor((diffInSeconds % 3600) / 60);
          const seconds = diffInSeconds % 60;

          // Update time left
          setTimeLeft({days, hours, minutes, seconds});
        }
      }, 1000);
    }

    // Clear interval on component unmount or when timer is stopped
    return () => clearInterval(intervalId);
  }, [targetDate, timerActive]);

  const handleStartClick = () => {
    if (!dateError) {
      setTimerActive(true);
    }
  };

  return (
    <div className='input'>
      <input type="datetime-local" onChange={handleDateChange} />
      <br/>
      <button onClick={handleStartClick}>Start</button>
      {dateError ? (
        <p>{dateError}</p>
      ) : timerActive ? (
        <div className='blocks'>
          <p>{timeLeft.days} Days</p>
          <p>{timeLeft.hours} Hours</p>
          <p>{timeLeft.minutes} Minutes</p>
          <p>{timeLeft.seconds} Seconds</p>
        </div>
      ) : (
        <div>
          <p>{timeLeft.days} Days</p>
          <p>{timeLeft.hours} Hours</p>
          <p>{timeLeft.minutes} Minutes</p>
          <p>{timeLeft.seconds} Seconds</p>
          {!timerActive && targetDate && <p>The countdown is over! What’s next on your adventure? 🌠</p>}
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
