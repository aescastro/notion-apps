import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import { Header } from '../components';
const Home = () => {
    return (
        <Stack
            width="100%"
            height="100%"
        >
            <Header/>
            <Stack
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <Link to="/Pomodoro-Timer">Timer</Link>
                <Link to="/Reading-Tracker">Reading Tracker</Link>
                <Link to="/Clock">Clock</Link>
            </Stack>
        </Stack>
    )
}

export default Home;