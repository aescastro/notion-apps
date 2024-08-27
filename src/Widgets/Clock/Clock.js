import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import moment from 'moment-timezone';
import styled from "@emotion/styled";
import { Widget } from "../Widget"; 
import { useQuery } from "../../utils";

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