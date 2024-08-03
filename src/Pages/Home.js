import { Link } from 'react-router-dom';
import {
    Stack,
    Grid,
 } from '@mui/material';

import { Header } from '../components';
import { MAIN_BACKGROUND_COLOUR } from '../constants';

const Home = () => {
    return (
        <Stack
            width="100%"
            height="100%"
            sx={{
                backgroundColor: MAIN_BACKGROUND_COLOUR,
            }}
        >
            <Header/>
            <Grid
                container
                sx={{
                    boxSizing: "border-box",
                    flexGrow: 1,
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Link to="/Clock">Clock</Link>
                </Grid>
                
                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Link to="/Pomodoro-Timer">Timer</Link>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Link to="/Reading-Tracker">Reading Tracker</Link>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default Home;