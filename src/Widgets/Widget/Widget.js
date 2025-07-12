
import { Box } from '@mui/material';

import {
    NOTION_FONTS,
} from "../../constants"
import {
    useWidgetParams
} from '../../utils';

export const Widget = (props) => {
    const widgetParams = useWidgetParams(props);
    
    return (
        <Box
            sx={{
                width: widgetParams.preview ? "100%" : "100vw",
                height: widgetParams.preview ? "100%" : "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                fontFamily: widgetParams.fontType ? NOTION_FONTS[widgetParams.fontType] : "sans-serif",
                backgroundColor: `#${widgetParams.bg}`,
                color: `#${widgetParams.fontColour}`,
            }}
        >
            {props.children}
        </Box>
    )
}