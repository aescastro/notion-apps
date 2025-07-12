import {
    Stack,
    Box,
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
        
            <Box
                // spacing={isDesktopWidth ? "50px" : "0px"}
                sx={{
                    boxSizing: "border-box",
                    padding: isDesktopWidth ? "50px" : "108px 20px 20px 20px",
                    flexGrow: 1,
                    gridTemplateRows: isDesktopWidth ? "50% 50%" : "auto auto auto",
                    gridTemplateColumns: isDesktopWidth ? "50% 50%" : "auto",
                    display: "grid",
                    gap: isDesktopWidth ? "50px" : "0"
                }}
            >
                <Box
                    xs={isDesktopWidth ? 6 : 12}
                    sx={{
                        display: "flex",
                        alignSelf: isDesktopWidth ? "flex-end" : "center",
                        justifySelf: isDesktopWidth ? "flex-end" : "center",
                        gridArea: "1 / 1 / span 1 / span 1",
                        height: "75%"
                    }}
                >               
                    <WidgetPreview href="/builder/clock" title="Clock" subtitle="Watch time tick by"><Clock preview/></WidgetPreview>
                </Box>
                
                <Box
                    item
                    xs={isDesktopWidth ? 6 : 12}
                    sx={{
                        display: "flex",
                        justifySelf: isDesktopWidth ? "flex-start" : "center",
                        alignSelf: isDesktopWidth ? "flex-end" : "center",
                        gridArea: "1 / 2 / span 1 / span 1",
                        height: "75%"
                    }}
                >                
                    <WidgetPreview href="/builder/pomodoro-timer" title="Pomodoro Timer" subtitle="Keep focus while giving yourself breaks"><Timer preview/></WidgetPreview>
                </Box>

                <Box
                    item
                    xs={isDesktopWidth ? 6 : 12}
                    sx={{
                        display: "flex",
                        justifySelf: isDesktopWidth ? "flex-end" : "center",
                        alignSelf: isDesktopWidth ? "flex-start" : "center",
                        gridArea: "2 / 1 / span 1 / span 1",
                        height: "75%"
                    }}
                >              
                    <WidgetPreview href="/builder/reading-tracker" title="Reading Tracker" subtitle="Track progress in your latest read"><ReadingTracker preview/></WidgetPreview>
                </Box>
                
            </Box>
        </Stack>
    )
}

export default Home;