import { Link } from 'react-router-dom';
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

const WidgetPreviewDiv = styled.Stack`
    height: 100%;
`

const CreatWidgetDiv = styled.Stack`
    position: absolute;
    height: 100%, 
    width: 100%,
    bottom: "10px",
    &:hover {
        visibility: visible;
        transition: visibility 0.5s linear;
    }
    &:hover ${WidgetPreviewDiv} {
        opacity: 0.6;
        transition: opacity 0.5s linear;
    }
`

const WidgetPreview = (props) => {

    return (

        <MuiLink
            as={Link}
            to={props.href}
            underline="none"
            sx={{
                position: "relative",
                aspectRatio: "415/340",
                height: "80%",
                minHeight: "237px",
                borderRadius: "10px",
                border: "1px solid #000",
                background: "#FFF",
                boxShadow: "1px 2px 4px 3px rgba(0, 0, 0, 0.25)",
                color: "#000000",
            }}
        >
            <CreatWidgetDiv>
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
            </CreatWidgetDiv>
            <WidgetPreviewDiv>

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
                        maxHeight: "90px",
                        padding: "21px",
                        flexGrow: 0,
                    }}
                >
                    <Title>{props.title}</Title>
                    <Subtitle>{props.subtitle}</Subtitle>
                </Stack>
            </WidgetPreviewDiv>
            
            
        </MuiLink>
    );
}

export default WidgetPreview;