
import { useEffect, useState } from 'react';
import { 
    NOTION_FONTS, 
    NOTION_BACKGROUNDS 
} from "../../constants"
import { 
    useDarkLightSwitcher, 
    useQuery 
} from '../../utils';

export const Widget = (props) => {
    const query = useQuery();
    const font = query.get("fontType"); 
    const [bg, setBg] = useState("");
    const [fontColour, setFontColour] = useState("");
    var isDarkMode = useDarkLightSwitcher();

    useEffect(() => {
        if (query.has("bg")) {
            setBg(query.get("bg"));
        } else if (isDarkMode) {
            setBg(NOTION_BACKGROUNDS.dark);
        } else {
            setBg(NOTION_BACKGROUNDS.light);
        }
        
        if (query.has("fontColour")) {
            setFontColour(query.get("fontColour"))
        } else if (isDarkMode) {
            setFontColour("#ffffff");
        } else {
            setFontColour("#37352F");
        }

    }, [isDarkMode, query]);

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "15px",
                fontFamily: font ? NOTION_FONTS[font] : "sans-serif",
                backgroundColor: bg,
                color: fontColour,
            }}
        >
            {props.children}
        </div>
    )
}