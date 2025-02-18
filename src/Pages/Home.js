import {
    Stack,
    Grid,
    useMediaQuery,
    useTheme,
 } from '@mui/material';

import { 
    Header,
    WidgetPreview,
} from '../components';
import { MAIN_BACKGROUND_COLOUR } from '../constants';

const Home = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery('(min-width: 800px)');
    const isTablet = useMediaQuery(theme.breakpoints.between('md', "lg"));
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
                spacing={"50px"}
                sx={{
                    boxSizing: "border-box",
                    flexGrow: 1,
                }}
            >
                <Grid
                    item
                    xs={isDesktop? 6 : 12}
                    sx={{
                        display: "flex",
                        justifyContent: isDesktop ? "flex-end" : "center",
                        alignItems: "flex-end",
                    }}
                >
                    <WidgetPreview href="/Clock" title="Clock" subtitle="Watch time tick by"/>
                </Grid>
                
                <Grid
                    item
                    xs={isDesktop? 6 : 12}
                    sx={{
                        display: "flex",
                        justifyContent: isDesktop ? "flex-start" : "center",
                        alignItems: "flex-end",
                    }}
                >
                    <WidgetPreview href="/Pomodoro-Timer" title="Pomodoro Timer" subtitle="Keep focus while giving yourself breaks"/>
                </Grid>

                <Grid
                    item
                    xs={isDesktop? 6 : 12}
                    sx={{
                        display: "flex",
                        justifyContent: isDesktop ? "flex-end" : "center",
                        alignItems: "flex-start",
                    }}
                >
                    <WidgetPreview href="/Reading-Tracker" title="Reading Tracker" subtitle="Track progress in your latest read"/>
                </Grid>
                
            </Grid>
        </Stack>
    )
}

export default Home;