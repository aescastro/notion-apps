import {
    Stack,
    useMediaQuery,
} from "@mui/material";

import styled from "@emotion/styled";

import {
    Header,
    MobileHeader
} from "../components";
 
import { theme, MAIN_BACKGROUND_COLOUR } from "../constants";

const HeaderText = styled.span`
    font-size: 45px;
    font-weight: 400;
`;

const BodyText = styled.span`
    font-size: 20px;
    font-weight: 300;
`;

const AboutUs = () => {   
    const isDesktopWidth = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Stack
            width="100%"
            height="max-content"
            sx={{
                backgroundColor: MAIN_BACKGROUND_COLOUR,
                overflowX: isDesktopWidth ? "visible" : "hidden",
            }}
        >
            {
                isDesktopWidth ? <Header/> : <MobileHeader/>
            }
            <Stack
                sx={{
                    padding: isDesktopWidth ? "60px 75px" : "148px 50px 60px 50px",
                    gap: "30px",
                    flexGrow: 1,
                }}
            >
                

            </Stack>
        </Stack>
    );
}

export default AboutUs;