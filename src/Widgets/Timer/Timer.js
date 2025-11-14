import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import useDimensions from 'react-cool-dimensions';
import {
    Box,
    Stack
} from "@mui/material";

import clickSound from '../../assets/sounds/Click_Sound.wav';
import notifSound from '../../assets/sounds/Notification_Sound.wav';
import { ReactComponent as WIcon } from '../../assets/icons/pen-fill.svg';
import { ReactComponent as BIcon } from '../../assets/icons/cup-hot-fill.svg';
import { Widget } from '../Widget';
import {
    useWidgetParams
} from '../../utils';

const icoCss = {
    gridRow: "1/span 1",
    marginRight: "5px",
    cursor: "pointer",
    "&:hover": {
        filter: "brightness(1.5)",
    }
}

const timeCss = {
    gridRow: "1 / span 1",
    margin: "0",
    fontWeight: "bold",
    lineHeight: "1",
    display: "inline"
};

const Grid = styled.div(({containerheight, containerwidth}) => ({
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    gridTemplateColumns: "auto auto auto auto",
    gridTemplateRows: `min-content min-content min(calc(0.18 * ${containerwidth}px), calc(0.23 * ${containerheight}px))`,
    userSelect: "none",
    position: "relative",
    borderRadius: "15px",
    padding: "5%",
    height: "min-content",
    right: `min(calc(0.09 * ${containerheight}px), calc(0.05 * ${containerwidth}px))`,
}));

const Button = styled.button(({ gridCol, containerheight, containerwidth, bgColour, color }) => ({
    backgroundColor: bgColour,
    color: color,
    borderColor: color,
    fontSize: `min(calc(0.06 * ${containerheight}px), calc(0.06 * ${containerwidth}px))`,
    gridRow: "3 / span 1",
    borderRadius: "4px",
    borderWidth: "1px",
    padding: `min(calc(0.03 * ${containerheight}px), calc(0.03 * ${containerwidth}px)) 0`,
    cursor: "pointer",
    gridColumnStart: gridCol,
}));

const WorkIcon = styled(WIcon)(({containerheight, containerwidth}) => ({
    ...icoCss,
    height: `min(calc(0.17 * ${containerheight}px), calc(0.17 * ${containerwidth}px))`,
}));
const BreakIcon = styled(BIcon)(({containerheight, containerwidth}) => ({
    ...icoCss,
    height: `min(calc(0.17 * ${containerheight}px), calc(0.17 * ${containerwidth}px))`,
}));

const TimerState = {
    work: "working",
    shortBreak: "shortBreak",
    longBreak: "longBreak"
};

function Timer(props) {
    const { observe, width, height } = useDimensions();
    const widgetParams = useWidgetParams(props);

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
        if (storedToday && !widgetParams.preview) {
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
            setCountDownDate(new Date().getTime() + (1000 * 60 * minutes) + (1000 * seconds));
        } else {
            clearInterval(ret);
        }
    }, [running]);

    useEffect(() => {
        switch (state) {
            case TimerState.work:
                setCountDownDate(new Date().getTime() + (1000 * 60 * 25));
                break;
            case TimerState.shortBreak:
                setCountDownDate(new Date().getTime() + (1000 * 60 * 5));
                break;
            case TimerState.longBreak:
                setCountDownDate(new Date().getTime() + (1000 * 60 * 15));
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
        <Widget {...widgetParams}>
            <Stack
                ref={observe}
                sx={{
                    width: "100%",
                    maxHeight: "100%",
                    maxWidth: "100%",
                    aspectRatio: "1.25 / 1",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Grid
                    containerheight={height}
                    containerwidth={width}
                >
                    {
                        state === TimerState.work ?
                            <WorkIcon 
                                onClick={changeState} 
                                containerheight={height}
                                containerwidth={width}
                            />
                            :
                            <BreakIcon 
                                onClick={changeState} 
                                containerheight={height}
                                containerwidth={width}
                            />
                    }

                    <Box
                        sx={{
                            ...timeCss,
                            fontSize: `min(calc(0.27 * ${width}px), calc(0.27 * ${height}px))`,
                            textAlign: "right",
                            gridColumn: "2 / span 1"
                        }}
                    >
                        {minutes < 10 ? "0" + minutes.toString() : minutes}
                    </Box>
                    <Box
                        sx={{
                            ...timeCss,
                            fontSize: `min(calc(0.27 * ${width}px), calc(0.27 * ${height}px))`,
                            textAlign: "center",
                            position: "relative",
                            bottom: "5%",
                            gridColumn: "3 / span 1"
                        }}
                    >
                        :
                    </Box>
                    <Box
                        sx={{
                            ...timeCss,
                            fontSize: `min(calc(0.27 * ${width}px), calc(0.27 * ${height}px))`,
                            textAlign: "left",
                            gridColumn: "4 / span 1"
                        }}
                    >
                        {seconds < 10 ? "0" + seconds.toString() : seconds}
                    </Box>

                    <Box
                        sx={{
                            position: "relative",
                            gridRow: "2 / span 1",
                            gridColumn: "3 / span 1",
                            fontWeight: "bold",
                            fontSize: `min(calc(0.10 * ${width}px), calc(0.10 * ${height}px))`,
                            textAlign: "center",
                            justifySelf: "center",
                            alignSelf: "center",
                            display: "inline",
                            lineHeight: "1.25",
                        }}
                    >
                        {sessions}
                    </Box>

                    <Button
                        onClick={runTimer}
                        gridCol={2}
                        containerheight={height}
                        containerwidth={width}
                        disabled={widgetParams.preview}
                        bgColour={widgetParams.bg}
                        color={widgetParams.fontColour}
                    >
                        {running ? "Pause" : "Start"}
                    </Button>

                    <Button
                        onClick={cancelTimer}
                        gridCol={4}
                        containerheight={height}
                        containerwidth={width}
                        disabled={widgetParams.preview}
                        bgColour={widgetParams.bg}
                        color={widgetParams.fontColour}
                    >
                        Cancel
                    </Button>
                </Grid>
            </Stack>
        </Widget>
    );
}

export { Timer };
