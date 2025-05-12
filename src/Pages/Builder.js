import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    Box,
    Button,
    Stack,
    Link as MuiLink,
    Popover,
    useMediaQuery,
} from '@mui/material';

import {
    MAIN_BACKGROUND_COLOUR,
    LIGHT_GREEN,
    DARK_GREEN,
    theme,
} from '../constants';
import {
    ReactComponent as ChevronIcon
} from "../assets/icons/chevron-left.svg";
import {
    ReactComponent as CopyIcon
} from "../assets/icons/copy.svg";
import {
    Clock,
    Timer,
    ReadingTracker,
} from "../Widgets"

const Builder = () => {
    const isDesktopWidth = useMediaQuery(theme.breakpoints.up('md'));
    const location = useLocation();
    const widget = location.pathname.split("/").pop();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [widgetUrl, setWidgetUrl] = useState(() => {
        switch (widget) {
            case "clock":
                return "https://aescastro.github.io/notion-apps/#/Clock"
            case "pomodoro-timer":
                return "https://aescastro.github.io/notion-apps/#/Pomodoro-Timer";
            case "reading-tracker":
                return "https://aescastro.github.io/notion-apps/#/Reading-Tracker";
            default:
                return "";
        }
    });


    const handleClick = (event) => {
        navigator.clipboard.writeText(widgetUrl)
        setAnchorEl(event.currentTarget);
        setTimeout(() => {
            handleClose();
        }, 1250);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Stack
            direction={isDesktopWidth ? "row" : "column"}
            sx={{
                width: "100%",
                height: "100vh",
            }}
        >
            <Stack
                sx={{
                    width: isDesktopWidth ? "50%" : "100%",
                    height: "auto",
                    backgroundColor: MAIN_BACKGROUND_COLOUR,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                }}>
                <MuiLink
                    as={Link}
                    to="/"
                    underline="none"
                    sx={{
                        color: "#000",
                        position: "absolute",
                        top: isDesktopWidth ? "20px" : "12px",
                        left: isDesktopWidth ? "10px" : "5px",
                        width: "fit-content",
                    }}>
                    <ChevronIcon height="37px" width="32px" />
                </MuiLink>
                <Stack
                    sx={{
                        alignItems: "center",
                        height: isDesktopWidth ? "100%" : "auto",
                        margin: isDesktopWidth ? "0px" : "52px 0 22px 0",
                        padding: isDesktopWidth ? "40px 0px" : "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        maxWidth: isDesktopWidth ? "50vw" : "80vw",
                        padding: isDesktopWidth ? "0 50px" : "0px",
            
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            aspectRatio: "438/330",
                            position: "relative",
                            top: isDesktopWidth ? "15vh" : "0px",
                            borderRadius: "10px",
                            border: "1px solid #000",
                        }}>
                        {
                            widget === "clock" ? <Clock preview />
                                : widget === "pomodoro-timer" ? <Timer preview />
                                    : widget === "reading-tracker" ? <ReadingTracker preview />
                                        : <Stack
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <h1>Please select a widget to build</h1>
                                        </Stack>
                        }

                    </Box>
                    <Stack
                        direction="row"
                        sx={{
                            marginTop: isDesktopWidth ? "auto" : "20px",
                            height: isDesktopWidth ? "55px" : "38px",
                            width: "100%",
                            borderRadius: "10px",
                            border: "1px solid rgb(0, 0, 0)",
                            background: "#FFF",
                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <Box
                            sx={{
                                margin: "auto",
                                flexGrow: 1,
                                textAlign: "center",
                                padding: isDesktopWidth ? "13px" : "0px 13px",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                width: "calc(40vh - 54px)",
                                fontSize: isDesktopWidth ? "16px" : "14px",
                            }}
                        >
                            {widgetUrl}
                        </Box>

                        <Button
                            onClick={handleClick}
                            aria-describedby={id}
                            sx={{
                                background: LIGHT_GREEN,
                                width: "54px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "0px 10px 10px 0px",
                                color: DARK_GREEN,
                                flexGrow: 0,
                                padding: "0px",
                                "&:hover": {
                                    background: LIGHT_GREEN,
                                },
                            }}
                        >
                            <CopyIcon width="25px" height="25px" />
                        </Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            slotProps={{
                                    "paper": {
                                        sx: {
                                            padding: "5px"
                                        }
                                    }
                                }
                            }
                            sx={{
                                fontFamily: "Josefin Sans",
                                fontSize: isDesktopWidth ? "14px" : "11px",
                            }}
                        >
                            
                                Copied!
                        </Popover>
                    </Stack>
                    <Box
                        sx={{
                            color: "rgba(0, 0, 0, 0.64)",
                            textAlign: "center",
                            fontFamily: "Josefin Sans",
                            fontSize: isDesktopWidth ? "14px" : "11px",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: "normal",
                            marginTop: "5px",
                            marginBottom: isDesktopWidth ? "15px" : "0px",
                        }}
                    >
                        paste this link into your Notion page and click “Embed”
                    </Box>
                </Stack>
            </Stack>
            <Stack
                sx={{
                    width: "50%",
                    height: "100%",
                    backgroundColor: "white",
                    padding: "60px 50px",
                    gap: "15px",
                    flexGrow: 0,
                }}
            >
            </Stack>
        </Stack>
    );
}

export default Builder; 