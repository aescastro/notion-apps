
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import {
    NOTION_FONTS,
    NOTION_BACKGROUNDS,
} from "../../constants"
import {
    useDarkLightSwitcher,
    useQuery
} from '../../utils';

export const Widget = (props) => {
    const query = useQuery();
    const font = !props.preview ? query.get("fontType") : props.fontType;
    const [bg, setBg] = useState("");
    const [fontColour, setFontColour] = useState("");
    var isDarkMode = useDarkLightSwitcher(props.mode);

    useEffect(() => {
        if (props.preview == null) {
            if (query.has("bg")) {
                setBg(query.get("bg"));
            } else if (isDarkMode) {
                setBg(NOTION_BACKGROUNDS.darkMode);
            } else {
                setBg(NOTION_BACKGROUNDS.lightMode);
            }

            if (query.has("fontColour")) {
                setFontColour(query.get("fontColour"))
            } else if (isDarkMode) {
                setFontColour("#ffffff");
            } else {
                setFontColour("#37352F");
            }
        } else {
            setBg(props.bgColour);
            setFontColour(props.fontColour)
        }

    }, [isDarkMode, query, props]);

    return (
        <Box
            sx={{
                width: props.preview ? "100%" : "100vw",
                height: props.preview ? "100%" : "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                fontFamily: font ? NOTION_FONTS[font] : "sans-serif",
                backgroundColor: `#${bg}`,
                color: `#${fontColour}`,
            }}
        >
            {props.children}
        </Box>
    )
}