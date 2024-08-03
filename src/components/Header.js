import Stack from '@mui/material/Stack';


import { LIGHT_GREEN, DARK_GREEN } from "../constants";
import {
    Button
} from "../components"
import { Box } from '@mui/material';

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
            }} 
        >
            <Stack
                direction="row"
                sx={{
                    gap: "55px",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        fontSize: "40px",
                        maxHeight: "100%",
                        position: "relative",
                        "&:hover": {
                            cursor: "pointer"
                        }
                    }}
                >
                    adri's notion widgets
                </Box>

                <Box
                    sx={{
                        fontSize: "24px",
                        color: DARK_GREEN,
                        "&:hover": {
                            color: "#218E49",
                            cursor: "pointer"
                        }
                    }}
                >
                    home
                </Box>

                <Box
                    sx={{
                        fontSize: "24px",
                        color: DARK_GREEN,
                        "&:hover": {
                            color: "#218E49",
                            cursor: "pointer"
                        }
                    }}
                >
                    about
                </Box>                
            </Stack> 

            <Stack
                direction="horizontal"
            >
                <Button>contact</Button>
            </Stack>
        </Stack>    
    )
}

export default Header;