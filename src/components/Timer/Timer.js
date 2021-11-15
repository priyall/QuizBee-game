import {useState, useEffect} from 'react';
import './Timer.css';
import {getRemainingTimeUntilMsTimestamp} from './Utils/TimerUtils';

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}

const Timer = ({countdownTimestampMs}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    },[countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return(
        <div className="timer">
            
            <span className="two-numbers">{remainingTime.minutes}</span>
            <span>minutes</span>
            <span className="two-numbers">{remainingTime.seconds}</span>
            <span>seconds</span>
        </div>
    );
}

export default Timer;