import { useState } from "react";
import {
    Stack,
    Box
} from "@mui/material";
import styled from "@emotion/styled"
import { Textfit } from "react-textfit";

import {
    Button,
} from "../components"
import {
    LIGHT_GREEN,
    DARK_GREEN,
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
`;

const MenuIcon = styled(ListIcon)`
    fill: ${DARK_GREEN};
    height: 32px;
    width: 32px;
    margin-left: auto;  
    flex-shrink: 0; 
`;

const CloseIcon = styled(XIcon)`
    fill: ${DARK_GREEN};
    height: 30px;
    width: 30px;
    margin-left: auto;
    margin-bottom: 70px;
`;

const MenuText = styled.span`
    color: ${DARK_GREEN};
    font-family: "Josefin Sans";
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
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
                <Title>
                    adri's notion widgets
                </Title>

                <MenuIcon onClick={() => setIsOpen(true)} />
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
                    zIndex: 1,
                    borderRadius: "10px 0 0 10px",
                    border: "1px solid #000",
                    transform: `translateX(${isOpen ? "-100%" : "0"})`,
                    transition: "transform 0.5s ease",
                    padding: "21px 18px",
                }}
            >
                <CloseIcon onClick={() => setIsOpen(false)} />

                <Stack 
                    sx={{
                        gap: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <MenuText>
                        home
                    </MenuText>

                    <MenuText>
                        about
                    </MenuText>

                    <Button>
                        contact
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}

export default MobileHeader;