import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import moment from "moment";
import styled from "@emotion/styled";
import { Widget } from "../Widget"; 

const H1 = styled.h1`
    margin: 0;
    font-size: 30vh;
    font-weight: bold;
`;

const H2 = styled.h2`
    margin: 0;
    font-size: 12vh;
    font-weight: 500;
`

const Clock = () => {
    const [date, setDate] = useState(moment().format("dddd, MMMM Do"));
    const [time, setTime] = useState(moment().format("hh:mm A"));

    useEffect(() => {
        setInterval(() => {
            setDate(moment().format("dddd, MMMM Do"));
            setTime(moment().format("hh:mm A"));
        }, 1000);
    }, []);


    return (
        <Widget>
            <Stack
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <H1>
                    {time}
                </H1>
                <H2>
                    {date}
                </H2>  
            </Stack>
        </Widget>
    );
}

export default Clock;