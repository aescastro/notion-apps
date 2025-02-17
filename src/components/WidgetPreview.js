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

const PreviewCss = {
    maxHeight: "340px",
    minHeight: "237px",
    maxWidth: "415px",
    minWidth: "352px", 
    height: "75%",
    margin: "35px",
}

const WidgetPreview = (props) => {
    const [onHover, setIsHover] = useState(false);
    return (
        <>
            <Stack
                onMouseLeave={() => setIsHover(false)}
                sx={{
                    ...PreviewCss,
                    position: "absolute",
                    zIndex: onHover ? 2 : 0,
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
                            
                        }}
                    >
                        
                        Create Widget
                    </Stack>
            </Stack>
            <MuiLink
                as={Link}
                to={props.href}
                underline="none"
                onMouseEnter={() => setIsHover(true)}
                sx={{
                    ...PreviewCss,
                    borderRadius: "10px",
                    border: "1px solid #000",
                    background: "#FFF",
                    boxShadow: "1px 2px 4px 3px rgba(0, 0, 0, 0.25)",
                    color: "#000000",
                    
                    opacity: onHover ? 0.6 : 1,
                    zIndex: 1,
                }}
            >
                <Stack
                    sx={{
                        height: "100%",
                    }}
                >
                    
                    <Stack
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        test
                    </Stack>
                    <Stack
                        sx={{
                            borderRadius: "0 0 10px 10px",
                            background: LIGHT_GREEN,
                            maxHeight: "85px",
                            padding: "21px",
                            flexGrow: 0,
                        }}
                    >
                        <Title>{props.title}</Title>
                        <Subtitle>{props.subtitle}</Subtitle>
                    </Stack>
                </Stack>
            </MuiLink>
        </>
    );
}

export default WidgetPreview;