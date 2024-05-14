import { useState, useEffect } from "react";
import { Widget } from "../Widget"; 
import { Stack } from "react-bootstrap";
import moment from "moment";

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
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <h1
                    style={{
                        margin: "0",
                        fontSize: "30vh",
                        fontWeight: "bold",
                    }}
                >
                    {time}
                </h1>
                <h2
                    style={{
                        margin: "0",
                        fontSize: "12vh"
                    }}
                >
                    {date}
                </h2>  
            </Stack>
        </Widget>
    );
}

export default Clock;