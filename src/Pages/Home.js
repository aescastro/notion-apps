import {
    Stack,
    Grid,
    useMediaQuery,
 } from '@mui/material';

import { 
    Header,
    WidgetPreview,
    MobileHeader,
} from '../components';
import {
    Clock,
    Timer,
    ReadingTracker,
} from "../Widgets"
import { MAIN_BACKGROUND_COLOUR, theme } from '../constants';

const Home = () => {
    const isDesktopWidth = useMediaQuery(theme.breakpoints.up('md'));
    const isSmallHeight = useMediaQuery('(max-height: 725px)');

    return (
        <Stack
            width="100%"
            height={isDesktopWidth ? isSmallHeight ? "fit-content" : "100vh" : "1000px"}
            sx={{
                backgroundColor: MAIN_BACKGROUND_COLOUR,
                overflowX: isDesktopWidth ? "visible" : "hidden",
            }}
        >
            {isDesktopWidth ? <Header/> : <MobileHeader/>}
        
            <Grid
                container
                spacing={isDesktopWidth ? "50px" : "0px"}
                sx={{
                    boxSizing: "border-box",
                    padding: isDesktopWidth ? "50px" : "108px",
                    flexGrow: 1,
                }}
            >
                <Grid
                    item
                    xs={isDesktopWidth ? 6 : 12}
                    sx={{
                        display: "flex",
                        justifyContent: isDesktopWidth ? "flex-end" : "center",
                        alignItems: isDesktopWidth ? "flex-end" : "center",
                    }}
                >
                    <WidgetPreview href="/Clock" title="Clock" subtitle="Watch time tick by"><Clock preview/></WidgetPreview>
                </Grid>
                
                <Grid
                    item
                    xs={isDesktopWidth ? 6 : 12}
                    sx={{
                        display: "flex",
                        justifyContent: isDesktopWidth ? "flex-start" : "center",
                        alignItems: isDesktopWidth ? "flex-end" : "center",
                    }}
                >
                    <WidgetPreview href="/Pomodoro-Timer" title="Pomodoro Timer" subtitle="Keep focus while giving yourself breaks"><Timer preview/></WidgetPreview>
                </Grid>

                <Grid
                    item
                    xs={isDesktopWidth ? 6 : 12}
                    sx={{
                        display: "flex",
                        justifyContent: isDesktopWidth ? "flex-end" : "center",
                        alignItems: isDesktopWidth ? "flex-start" : "center",
                    }}
                >
                    <WidgetPreview href="/Reading-Tracker" title="Reading Tracker" subtitle="Track progress in your latest read"><ReadingTracker/></WidgetPreview>
                </Grid>
                
            </Grid>
        </Stack>
    )
}

export default Home;