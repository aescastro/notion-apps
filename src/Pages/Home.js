import { Link } from 'react-router-dom';
import { Stack } from 'react-bootstrap';
const Home = () => {
    return (
        <Stack>
            <Link to="/Pomodoro-Timer">Timer</Link>
            <Link to="/Reading-Tracker">Reading Tracker</Link>
        </Stack>
    )
}

export default Home;