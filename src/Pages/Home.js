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
            height={!isDesktopWidth || isSmallHeight? "fit-content" : "100vh"}
            sx={{
                backgroundColor: MAIN_BACKGROUND_COLOUR,
            }}
        >
            {isDesktopWidth ? <Header/> : <MobileHeader/>}
        
            <Box
                sx={{
                    boxSizing: "border-box",
                    position: isDesktopWidth ? "static" : "absolute",
                    backgroundColor: 'inherit',
                    top: "88px",
                    width: "100%",
                    padding: isDesktopWidth ? "35px" : "20px",
                    marginBottom: isDesktopWidth ? "88px" : "0",
                    flexGrow: 1,
                    gridTemplateRows: isDesktopWidth ? "50% 50%" : "auto auto auto",
                    gridTemplateColumns: isDesktopWidth ? "50% 50%" : "auto",
                    display: "grid",
                    gap: "50px"
                }}
            >
                <Box
                    xs={isDesktopWidth ? 6 : 12}
                    sx={{
                        display: "flex",
                        alignSelf: isDesktopWidth ? "flex-end" : "center",
                        justifySelf: isDesktopWidth ? "flex-end" : "center",
                        gridArea: "1 / 1 / span 1 / span 1",
                        height: "80%"
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
                        gridArea: isDesktopWidth ? "1 / 2 / span 1 / span 1" : "2 / 1 / span 1 / span 1",
                        height: "80%"
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
                        gridArea: isDesktopWidth ? "2 / 1 / span 1 / span 1" : "3 / 1 / span 1 / span 1",
                        height: "80%",
                        paddingBottom: isDesktopWidth ? "0px" : "20px",
                    }}
                >              
                    <WidgetPreview href="/builder/reading-tracker" title="Reading Tracker" subtitle="Track progress in your latest read"><ReadingTracker preview/></WidgetPreview>
                </Box>
                
            </Box>
        </Stack>
    )
}

export default Home;