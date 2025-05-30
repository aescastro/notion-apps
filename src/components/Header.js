import { Link } from "react-router-dom";
import { 
    Box,
    Stack,
    Link as MuiLink,
} from '@mui/material';

import { LIGHT_GREEN, DARK_GREEN, LINKS, HOVER_GREEN } from "../constants";
import {
    Button
} from "../components"

const Header = () => {
    return (
        <Stack
            direction="row"
            sx={{
                padding: "24px 40px",
                background: LIGHT_GREEN,
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                maxHeight:"88px",
                fontWeight: 400,
                color: DARK_GREEN,
                cursor: "default",
                flexGrow: 0,
                zIndex: 3,
                position: "sticky",
                top: 0,
            }} 
        >
            <Stack
                direction="row"
                sx={{
                    gap: "55px",
                    alignItems: "center",
                }}
            >
                <MuiLink as={Link} to={LINKS.HOME} underline="none">
                    <Box
                        sx={{
                            fontSize: "40px",
                            maxHeight: "100%",
                            position: "relative",
                            color: DARK_GREEN,
                        }}
                    >
                        adri's notion widgets
                    </Box>
                </MuiLink>

                <MuiLink as={Link} to={LINKS.HOME} underline="none">
                    <Box
                        sx={{
                            fontSize: "24px",
                            color: DARK_GREEN,
                            "&:hover": {
                                color: HOVER_GREEN,
                            }
                        }}
                    >
                        home
                    </Box>
                </MuiLink>

                {/* <MuiLink as={Link} to={LINKS.ABOUT} underline="none">
                    <Box
                        sx={{
                            fontSize: "24px",
                            color: DARK_GREEN,
                            "&:hover": {
                                color: HOVER_GREEN
                            }
                        }}
                    >
                        about
                    </Box>    
                </MuiLink>             */}
            </Stack> 

            <MuiLink as={Link} to={LINKS.CONTACT} underline="none">
                <Button>contact</Button>
            </MuiLink>
        </Stack>    
    )
}

export default Header;