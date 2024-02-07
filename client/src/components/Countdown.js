import React, { useState, useEffect } from 'react';

export default function Countdown() {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        return () => {
            clearInterval(countdownInterval);
        };
    }, []);

    return (
        <div className='countdown'>
            <h2>{countdown}</h2>
        </div>
    );
}
