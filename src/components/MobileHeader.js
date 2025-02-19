import {
    Stack,
} from "@mui/material";
import styled from "@emotion/styled"

import {
    LIGHT_GREEN,
    DARK_GREEN,
} from "../constants"
import {
    ReactComponent as ListIcon
} from "../assets/icons/list.svg"

const Title = styled.h1`
    color: ${DARK_GREEN};
    font-family: "Josefin Sans";
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    flex-grow: 1;
    flex-shrink: 1;
`;

const Icon = styled(ListIcon)`
    fill: ${DARK_GREEN};
    height: 32px;
    width: 32px;
    margin-left: auto;  
`;

const MobileHeader = () => {
    return (
        <Stack
            direction="row"
            sx={{
                background: LIGHT_GREEN,
                height: "74px",
                padding: "21px 18px"
            }}
        >
            <Title>
                adri's notion widgets
            </Title>

            <Icon/>
        </Stack>
    );
}

export default MobileHeader;