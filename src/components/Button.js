import { Button as MuiButton } from "@mui/material";

import { DARK_GREEN, LIGHT_GREEN } from "../constants";

const Button = (props) => {
    return (
        <MuiButton
            onClick={props.onClick}
            sx={{
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "10px",
                border: `1px solid ${DARK_GREEN}`,
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 400,
                color: DARK_GREEN,
                width: "fit-content",
                padding: "5px 10px",
                "&:hover": {
                    backgroundColor: DARK_GREEN,
                    color: LIGHT_GREEN,
                    cursor: "pointer",
                }
            }}
        >
            {props.children}
        </MuiButton>
    )
}

export default Button;