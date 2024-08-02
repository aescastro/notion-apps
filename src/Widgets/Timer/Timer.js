import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import './Timer.css';
import clickSound from '../../assets/sounds/Click_Sound.wav';
import notifSound from '../../assets/sounds/Notification_Sound.wav';
import { ReactComponent as WorkingIcon } from '../../assets/icons/pen-fill.svg';
import { ReactComponent as BreakIcon } from '../../assets/icons/cup-hot-fill.svg';
import { Widget } from '../Widget';
import {
    useQuery,
} from '../../utils';

const Button = styled.button(({query}) => ({
    backgroundColor: query.has("buttonBg") ? query.get("buttonBg") : "#FFFFFF",
    color: query.has("buttonFontColour") ? query.get("buttonFontColour") : "#37352F",
    borderColor: query.has("buttonFontColour") ? query.get("buttonFontColour") : "#37352F",
}));


const TimerState = {
    work: "working",
    shortBreak: "shortBreak",
    longBreak: "longBreak"
};

function Timer() {
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    const [sessions, setSessions] = useState();
    const [state, setState] = useState();
    const [created] = useState(new Date());
    const [running, setRunning] = useState(false);
    const [ret, setRet] = useState(0);
    const notif = useRef();
    const click = useRef();
    const [countDownDate, setCountDownDate] = useState(null);
    const query = useQuery();
    
    const runTimer = () => {
        click.current.play();
        setRunning(!running);
    }

    const cancelTimer = () => {
        click.current.play();
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
            default:
                break;
        }
    }

    const changeState = () => {  
        click.current.play();
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
                default:
                    break;
            }
        }

        setRunning(false);
    }

    useEffect(() => {
        notif.current = new Audio(notifSound);
        click.current = new Audio(clickSound);

        var stored = new Date(parseInt(window.localStorage.getItem("created")));
        var storedToday = stored && stored.getDate() === created.getDate() && stored.getMonth() === created.getMonth() && stored.getFullYear() === created.getFullYear();
        if (storedToday) {
            let minutes = parseInt(window.localStorage.getItem("minutes"));
            let seconds = parseInt(window.localStorage.getItem("seconds"));
            let sessions = parseInt(window.localStorage.getItem("sessions"));
            let state = window.localStorage.getItem("state");
            setMinutes(minutes ? minutes : 25);
            setSeconds(seconds ? seconds : 0);
            setSessions(sessions ? sessions : 0);
            setState(TimerState[state] ? TimerState[state] : TimerState.work);
        } else {
            window.localStorage.setItem("created", created.valueOf());
            setMinutes(25);
            setSeconds(0);
            setSessions(0);
            setState(TimerState.work);
        }
       
    }, []);
    
    useEffect(() => {
        const timerDone = () => {
            notif.current.play();
    
            if (state === TimerState.work) {
                var nextSessions = sessions + 1;
                
                if (nextSessions % 4 === 0) {
                    setState(TimerState.longBreak);
                } else {
                    setState(TimerState.shortBreak)
                }
                setSessions(nextSessions);
            } else {
                setState(TimerState.work);
            } 
            
        }

        if (running) {
            var nextRet = (setInterval(() => {
                var now = new Date().getTime();
                var timeleft = countDownDate - now;
                var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.round((timeleft % (1000 * 60)) / 1000);
                
                if (seconds === 60) {
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
            default:
                break;
        }
    }, [state]);

    useEffect(() => {
        if (minutes != null && seconds != null && sessions != null && state) {
            window.localStorage.setItem("minutes", minutes);
            window.localStorage.setItem("seconds", seconds);
            window.localStorage.setItem("sessions", sessions);
            window.localStorage.setItem("state", state);
        }
    }, [minutes, seconds, sessions, state]);

    return (
        <Widget>
            <div id="content">
                {state === TimerState.work ? <WorkingIcon id="ico" onClick={changeState}/> : <BreakIcon id="ico" onClick={changeState}/>}
                    
                <h1 id="mins">{minutes < 10 ? "0" + minutes.toString() : minutes}</h1>
                <h1 id="col">:</h1>
                <h1 id="secs">{seconds < 10 ? "0" + seconds.toString() : seconds}</h1>
                
                <span id="session-display">{sessions}</span>
            
                <Button 
                    className="access-buttons" 
                    id="start" 
                    onClick={runTimer}
                    query={query}
                > 
                    {running ? "Pause" : "Start"} 
                </Button>
                <Button 
                    className="access-buttons" 
                    id="cancel" 
                    onClick={cancelTimer}
                    query={query}
                > 
                    Cancel 
                </Button>
            </div>    
        </Widget>
    );
}

export {Timer};
