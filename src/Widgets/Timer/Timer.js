import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';
import clickSound from './sounds/Click_Sound.wav';
import notifSound from './sounds/Notification_Sound.wav';
import { ReactComponent as WorkingIcon } from './icons/pen-fill.svg';
import { ReactComponent as BreakIcon } from './icons/cup-hot-fill.svg';


const TimerState = {
    work: "working",
    shortBreak: "shortBreak",
    longBreak: "longBreak"
};

function Timer(props) {
    const [minutes, setMinutes] = useState(props.minutes ?? 25);
    const [seconds, setSeconds] = useState(props.seconds ?? 0);
    const [sessions, setSessions] = useState(props.sessions ?? 0);
    const [state, setState] = useState(props.state ?? TimerState.work);
    const [running, setRunning] = useState(false);
    const [ret, setRet] = useState(0);
    const [countDownDate, setCountDownDate] = useState(null);

    const notif = new Audio(notifSound);
    const click = new Audio(clickSound);
    
    useEffect(() => {
        if (running) {
            var nextRet = (setInterval(() => {
                var now = new Date().getTime();
                var timeleft = countDownDate - now;
                var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.round((timeleft % (1000 * 60)) / 1000);
                
                if (seconds == 60) {
                    seconds = 0;
                    minutes++;
                }
                
                if (timeleft <= 0) {
                    timerDone(); 
                    setMinutes(0);
                    setSeconds(0);     
                    clearInterval(nextRet);              
                } else {
                    setMinutes(minutes);
                    setSeconds(seconds);
                }

            }, 1000));
            setRet(nextRet);
        }
    }, [countDownDate]);

    useEffect(() => {
        if (running) {
            setCountDownDate(new Date().getTime() + (1000*60*minutes) + (1000*seconds));
        } else {
            clearInterval(ret);
        }
    }, [running]);

    useEffect(()=> {
        switch(state) {
            case TimerState.work:
                setCountDownDate(new Date().getTime() + (1000*60*25));
            break;
            case TimerState.shortBreak:
                setCountDownDate(new Date().getTime() + (1000*60*5));
            break;
            case TimerState.longBreak:
                setCountDownDate(new Date().getTime() + (1000*60*15));
            break;
        }
    }, [state]);

    const timerDone = () => {
        notif.play();

        if (state == TimerState.work) {
            var nextSessions = sessions + 1;
            
            if (nextSessions % 4 == 0) {
                setState(TimerState.longBreak);
            } else {
                setState(TimerState.shortBreak)
            }
            setSessions(nextSessions);
        } else {
            setState(TimerState.work);
        } 
        
    }
    
    const runTimer = () => {
        click.play();
        setRunning(!running);
    }

    const cancelTimer = () => {
        click.play();
        setCountDownDate(null);
        clearInterval(ret);
        setRunning(false);
        setTime();
    }

    const setTime = () => {
        switch (state) {
            case TimerState.shortBreak:
                setMinutes(5);
                setSeconds(0);
            break;
            case TimerState.longBreak:
                setMinutes(15);
                setSeconds(0);
            break;
            case TimerState.work:
                setMinutes(25);
                setSeconds(0);
            break;
        }
    }

    const changeState = () => {  
        click.play();
        clearInterval(ret);

        if (running) {
            setState(state);
            setTime();
        } else {
            switch (state) {
                case TimerState.work:
                    setState(TimerState.shortBreak);
                    setMinutes(5);
                    setSeconds(0);
                    break;
                case TimerState.shortBreak:
                    setState(TimerState.longBreak);
                    setMinutes(15);
                    setSeconds(0);
                    break;
                case TimerState.longBreak:
                    setState(TimerState.work);
                    setMinutes(25);
                    setSeconds(0);  
                    break;
            }
        }

        setRunning(false);
    }
    
    return (
        <div id="content">
            {state == TimerState.work ? <WorkingIcon id="ico" onClick={changeState}/> : <BreakIcon id="ico" onClick={changeState}/>}
                
            <h1 id="mins">{minutes < 10 ? "0" + minutes.toString() : minutes}</h1>
            <h1 id="col">:</h1>
            <h1 id="secs">{seconds < 10 ? "0" + seconds.toString() : seconds}</h1>
            
            <span id="session-display">{sessions}</span>
        
            <button className="access-buttons" id="start" onClick={runTimer}> {running ? "Pause" : "Start"} </button>
            <button className="access-buttons" id="cancel" onClick={cancelTimer}> Cancel </button>
        </div>
        
    );
}

export {Timer};
