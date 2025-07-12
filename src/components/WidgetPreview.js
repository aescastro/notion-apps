import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
    Stack,
    Link as MuiLink,
} from '@mui/material';
import styled from "@emotion/styled"

import {
    LIGHT_GREEN,
    NOTION_BACKGROUNDS,
} from "../constants"

const Title = styled.span`
    color: #000;
    font-family: "Josefin Sans";
    font-size: 27px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Subtitle = styled.span`
    color: #000;
    font-family: "Josefin Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 2px;
`

const WidgetPreview = ({children, href, title, subtitle}) => {
    const [onHover, setIsHover] = useState(false);

    return (

        <MuiLink
            as={Link}
            to={href}
            underline="none"
            sx={{
                position: "relative",
                aspectRatio: "415/340",
                minHeight: "237px",
                maxHeight: "calc((50vw - 50px) * 330 / 415)",
                maxWidth: "100%",
                borderRadius: "10px",
                border: "1px solid #000",
                background: "#FFF",
                boxShadow: "1px 2px 4px 3px rgba(0, 0, 0, 0.25)",
                color: "#000000",
            }}
        >
            <Stack
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                sx={{
                    position: "absolute",
                    zIndex: 2,
                    height: "100%", 
                    width: "100%",
                    bottom: "10px"
                }}
            >
                <Stack
                    sx={{
                        height: "56px",
                        width: "187px",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: NOTION_BACKGROUNDS.darkMode,
                        color: "#FFF",
                        borderRadius: "10px",
                        border: "1px solid #000",
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        margin: "auto auto auto auto",
                        visibility: onHover ? "visible" : "hidden",
                    }}
                >

                    Create Widget
                </Stack>
            </Stack>
            <Stack
                sx={{
                    height: "100%",
                    zIndex: 1,
                    opacity: onHover ? 0.6 : 1,
                }}
            >

                <Stack
                    sx={{
                        flexGrow: 1,
                        maxHeight: "calc(100% - 90px)",
                    }}
                >
                    {children}
                </Stack>
                <Stack
                    sx={{
                        borderRadius: "0 0 10px 10px",
                        background: LIGHT_GREEN,
                        maxHeight: "90px",
                        padding: "21px",
                        flexGrow: 0,
                        marginTop: "auto",
                    }}
                >
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>
                </Stack>
            </Stack>
        </MuiLink>
    );
}

export default WidgetPreview;