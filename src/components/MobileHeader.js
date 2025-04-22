import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Stack,
    Box,
    Link as MuiLink,
    useMediaQuery,
} from "@mui/material";
import styled from "@emotion/styled"

import {
    Button,
} from "../components"
import {
    LIGHT_GREEN,
    DARK_GREEN,
    LINKS,
    HOVER_GREEN,
} from "../constants"
import {
    ReactComponent as ListIcon
} from "../assets/icons/list.svg"
import {
    ReactComponent as XIcon
} from "../assets/icons/x-lg.svg"


const MenuIcon = styled(ListIcon,
    {
        shouldForwardProp: (prop) => prop !== "isOpen"
    })` 
        fill: ${DARK_GREEN};
        height: 32px;
        width: 32px;
        margin-left: auto;  
        flex-shrink: 0; 
        rotate: ${props =>  props.isOpen ? "-90deg" : "0deg"};
        transition: rotate 0.5s ease;
`;

const CloseIcon = styled(XIcon,
    {
        shouldForwardProp: (prop) => prop !== "isOpen"
    })`
    fill: ${DARK_GREEN};
    height: 30px;
    width: 30px;
    margin-left: auto;
    margin-bottom: 70px;
    rotate: ${props =>  props.isOpen ? "-90deg" : "0deg"};
    transition: rotate 0.5s ease;
`;

const MenuText = styled.span`
    color: ${DARK_GREEN};
    font-family: "Josefin Sans";
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    :hover {
        color: ${HOVER_GREEN};
    }
`;

const MobileHeader = () => {
    const isRegularWidth= useMediaQuery("(min-width: 372px)");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                width: "100%",
                zIndex: 3,
            }}
        >
            <Stack
                direction="row"
                sx={{
                    background: LIGHT_GREEN,
                    height: "88px",
                    padding: "21px 18px",
                    alignItems: "center",
                    gap: "7px",
                    position: "relative",
                    overflow: "hidden",

                }}
            >
                <MuiLink as={Link} to={LINKS.HOME} underline="none">
                    <Box
                        sx={{                  
                            color: DARK_GREEN,
                            fontFamily: "Josefin Sans",
                            fontSize: isRegularWidth ? "32px" : "27px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "normal",
                            flexGrow: "1",
                            flexShrink: "1",
                            height: "100%",
                            alignContent: "center",
                            textDecoration: "none",
                        }}
                    >

                        adri's notion widgets
                    </Box>
                </MuiLink>

                <MenuIcon onClick={() => setIsOpen(true)} isOpen={isOpen} />
            </Stack>
            <Stack
                sx={{
                    background: LIGHT_GREEN,
                    height: "100vh",
                    width: "932px",
                    maxWidth: "322px",
                    position: isOpen ? "fixed" : "absolute",
                    top: 0,
                    left: "100%",
                    borderRadius: "10px 0 0 10px",
                    border: "1px solid #000",
                    transform: `translateX(${isOpen ? "-100%" : "0"})`,
                    transition: "transform 0.5s ease",
                    padding: "21px 18px",
                }}
            >
                <CloseIcon onClick={() => setIsOpen(false)} isOpen={isOpen} />

                <Stack
                    sx={{
                        gap: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <MuiLink as={Link} to={LINKS.HOME} underline="none">
                        <MenuText>
                            home
                        </MenuText>
                    </MuiLink>

                    <MuiLink as={Link} to={LINKS.ABOUT} underline="none">
                        <MenuText>  
                            about
                        </MenuText>
                    </MuiLink>

                    <MuiLink as={Link} to={LINKS.CONTACT} underline="none">
                        <Button>
                            contact
                        </Button>
                    </MuiLink>
                </Stack>
            </Stack>
        </Box>
    );
}

export default MobileHeader;