import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Stack,
    Box,
    Link as MuiLink,
} from "@mui/material";
import styled from "@emotion/styled"
import { Textfit } from "react-textfit";

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


const Title = styled(Textfit)`
    color: ${DARK_GREEN};
    font-family: "Josefin Sans";
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    flex-grow: 1;
    flex-shrink: 1;
    height: 100%;
    align-content: center; 
    text-decoration: none;
`;

const MenuIcon = styled(ListIcon)`
    fill: ${DARK_GREEN};
    height: 32px;
    width: 32px;
    margin-left: auto;  
    flex-shrink: 0; 
    rotate: ${(props) => props.isOpen ? "-90deg" : "0deg"};
    transition: rotate 0.5s ease;
`;

const CloseIcon = styled(XIcon)`
    fill: ${DARK_GREEN};
    height: 30px;
    width: 30px;
    margin-left: auto;
    margin-bottom: 70px;
    rotate: ${(props) => props.isOpen ? "-90deg" : "0deg"};
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
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box
            sx={{
                position: "relative",
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
                    <Title>

                        adri's notion widgets
                    </Title>
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
                    zIndex: 3,
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