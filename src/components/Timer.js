import React, { useState, useEffect } from 'react';

const Timer = ({ onTimeUp }) => {
    // 30 minutes in seconds.
    const [timeLeft, setTimeLeft] = useState(30 * 60);

    useEffect(() => {
        // Exit early if timer is finished
        if (timeLeft <= 0) {
            onTimeUp(); // Trigger the auto-submit function.
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

    
        return () => clearInterval(intervalId);
    }, [timeLeft, onTimeUp]);

    // Format time for display
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="timer">
            Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};

export default Timer;