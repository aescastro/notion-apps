import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    Box,
    Button,
    Stack,
    Link as MuiLink,
    Popover,
    FormControl,
    FormLabel,
    FormHelperText,
    useMediaQuery,
} from '@mui/material';
import {
    useFormik,
} from "formik";
import * as Yup from "yup";

import {
    MAIN_BACKGROUND_COLOUR,
    LIGHT_GREEN,
    DARK_GREEN,
    theme,
} from '../constants';
import {
    ColorPicker,
} from '../components';
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
import styled from '@emotion/styled';

// const validationSchema = Yup.object({
//     bgColour: Yup.string().matches("/^#([0-9a-f]{3}|[0-9a-f]{6})$/i"),
//     fontColour: Yup.string(),
//     progressColour: Yup.string().matches("/^#([0-9a-f]{3}|[0-9a-f]{6})$/i"),
//     buttonBg: Yup.string().matches("/^#([0-9a-f]{3}|[0-9a-f]{6})$/i"),
//     buttonFontColour: Yup.string().matches("/^#([0-9a-f]{3}|[0-9a-f]{6})$/i"),
// })

const Select = styled.select(() => ({
    backgroundColor: "#ffffff",
    borderRadius: "4px",
    boxShadow: "none",
    borderWidth: "1px",
    borderColor: "#EDF2F7",
    borderStyle: "solid",
    height: "40px",
    fontSize: "0.875rem",
    width: "calc(296px + 0.5rem)"
}))

const Builder = () => {
    const isDesktopWidth = useMediaQuery(theme.breakpoints.up('md'));
    const formik = useFormik({
        initialValues: {
            bgColour: "#ffffff",
            fontColour: "#000000",
            mode: "light",
            fontType: "default",
            progressColour: "#000000",
            buttonBg: "#ffffff",
            buttonFontColour: "#000000",
        },
    })
    const location = useLocation();
    const widget = location.pathname.split("/").pop();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [baseUrl] = useState(() => {
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
    const [widgetUrl, setWidgetUrl] = useState(baseUrl);

    useEffect(() => {
        var nextUrl = baseUrl + `?bg=${formik.values.bgColour}&fontColour=${formik.values.fontColour}&fontType=${formik.values.fontType}&mode=${formik.values.mode}`;

        switch (widget) {
            case "reading-tracker":
                nextUrl += `&progressColour=${formik.values.progressColour}`
                break;
            case "pomodoro-timer":
                nextUrl += `&buttonBg=${formik.values.buttonBg}&buttonFontColour=${formik.values.buttonFontColour}`
                break;
            default:
                break;

        }

        setWidgetUrl(nextUrl)
    }, [formik.values, baseUrl])

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
                        // padding: isDesktopWidth ? "40px 0px" : "30px",
                        justifyContent: "center",
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
                gap="15px"
                sx={{
                    width: "50%",
                    height: "100%",
                    backgroundColor: "white",
                    padding: "60px 50px",
                    gap: "15px",
                    flexGrow: 0,
                }}
            >
                <FormControl>
                    <FormLabel>Background Colour</FormLabel>
                    <ColorPicker
                        label="Background Colour"
                        name="bgColour"
                        defaultValue="#FFFFFF"
                        setFieldValue={formik.setFieldValue}
                        value={formik.values.bgColour}
                        type="color"
                    />
                    {
                        formik.errors.bgColour &&
                        <FormHelperText
                            error
                        >
                            Invalid colour
                        </FormHelperText>
                    }

                </FormControl>

                <FormControl>
                    <FormLabel>Font Colour</FormLabel>
                    <ColorPicker
                        name="fontColour"
                        setFieldValue={formik.setFieldValue}
                        value={formik.values.fontColour}
                    />
                    {
                        formik.errors.fontColour &&
                        <FormHelperText
                            error
                        >
                            Invalid colour
                        </FormHelperText>
                    }
                </FormControl>

                <FormControl>
                    <FormLabel>Font Type</FormLabel>
                    <Select
                        name="fontType"
                        onChange={formik.handleChange}
                        value={formik.values.fontType}
                    >
                        <option value="default">Default</option>
                        <option value="serif">Serif</option>
                        <option value="mono">Mono</option>
                    </Select>
                </FormControl>

                {
                    widget === "pomodoro-timer" &&
                    <>
                        <FormControl>
                            <FormLabel>Button Background Colour</FormLabel>
                            <ColorPicker
                                name="buttonBg"
                                defaultValue="#000000"
                                controls={{
                                    "disabled": false,
                                    "readOnly": false,
                                    "closeOnSelect": false,
                                }}
                                setFieldValue={formik.setFieldValue}
                                value={formik.values.buttonBg}
                            />
                            {
                                formik.errors.buttonBg &&
                                <FormHelperText
                                    error
                                >
                                    Invalid colour
                                </FormHelperText>
                            }
                        </FormControl>

                        <FormControl>
                            <FormLabel>Button Font Colour</FormLabel>
                            <ColorPicker
                                name="buttonFontColour"
                                defaultValue="#000000"
                                controls={{
                                    "disabled": false,
                                    "readOnly": false,
                                    "closeOnSelect": false,
                                }}
                                setFieldValue={formik.setFieldValue}
                                value={formik.values.buttonFontColour}
                            />
                            {
                                formik.errors.buttonFontColour &&
                                <FormHelperText
                                    error
                                >
                                    Invalid colour
                                </FormHelperText>
                            }
                        </FormControl>
                    </>
                }

                {
                    widget === "reading-tracker" &&
                    <FormControl>
                        <FormLabel>Progress Colour</FormLabel>
                        <ColorPicker
                            name="progressColour"
                            defaultValue="#000000"
                            controls={{
                                "disabled": false,
                                "readOnly": false,
                                "closeOnSelect": false,
                            }}
                            onChange={formik.handleChange}
                            value={formik.values.progressColour}
                        />
                        {
                            formik.errors.progressColour &&
                            <FormHelperText
                                error
                            >
                                Invalid colour
                            </FormHelperText>
                        }
                    </FormControl>
                }

                <FormControl>
                    <FormLabel>Light/Dark Mode</FormLabel>
                    <Select
                        name="mode"
                        onChange={formik.handleChange}
                        value={formik.values.mode}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                    </Select>
                </FormControl>

            </Stack>

        </Stack >
    );
}

export default Builder; 