import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import moment from 'moment-timezone';
import styled from "@emotion/styled";
import useDimensions from "react-cool-dimensions";

import { Widget } from "../Widget"; 
import { useQuery } from "../../utils";

const H1 = styled.h1`
    margin: 0;
    font-size: min(calc(0.32 * ${(props) => props.containerHeight}px), calc(0.213 * ${(props) => props.containerWidth}px));
    font-weight: bold;
`;

const H2 = styled.h2`
    margin: 0;
    font-size: min(calc(0.10 * ${(props) => props.containerHeight}px), calc(0.067 * ${(props) => props.containerWidth}px));  
    font-weight: 500;
`

const Clock = () => {
    const { observe, width, height } = useDimensions();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    var query = useQuery();

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (query.has("timezone")) {
                setDate(moment.tz(query.get("timezone")).format("dddd, MMMM Do"));
                setTime(moment.tz(query.get("timezone")).format("hh:mm A"));
            } else {
                setDate(moment().format("dddd, MMMM Do"));
                setTime(moment().format("hh:mm A"));
            }
        }, 1000);
        return () => {
            clearInterval(intervalId);
        }
    }, [query]);


    return (
        <Widget>
            <Stack
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "1.75 / 1",
                    height: "100%",
                    overflowY: "hidden",
                }}
                ref={observe}
            >
                <H1 containerHeight={height} containerWidth={width}>
                    {time}
                </H1>
                <H2 containerHeight={height} containerWidth={width}>
                    {date}
                </H2>  
            </Stack>
        </Widget>
    );
}

export default Clock;