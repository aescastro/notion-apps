import { useState, useEffect } from "react";

import { 
    useQuery ,
    useDarkLightSwitcher,
} from ".";
import {
    NOTION_BACKGROUNDS,
} from "../constants";

export const useWidgetParams = (props) => {
    const [widgetParams, setWidgetParams] = useState(props);
    const isDarkMode = useDarkLightSwitcher(props ? props.mode : "light");
    const query = useQuery();

    useEffect(() => {
        setWidgetParams(prevParams => {
            const newParams = { ...prevParams }; 

            newParams.fontType = props.fontType ?? "sans";

            if (props?.fontType) {
                newParams.fontType = props.fontType;
            } else if (query.has("fontType")) {
                newParams.fontType = query.get("fontType")
            } else {
                newParams.fontType = "sans";
            }
            
            if (props?.bg) { 
                newParams.bg = props.bg;
            } else if (query.has("bg")) {
                newParams.bg = query.get("bg");
            } else if (isDarkMode) {
                newParams.bg = NOTION_BACKGROUNDS.darkMode;
            } else {
                newParams.bg = NOTION_BACKGROUNDS.lightMode;
            }
            
            if (props?.fontColour) {
                newParams.fontColour = props.fontColour;
            } else if (query.has("fontColour")) {
                newParams.fontColour = query.get("fontColour");
            } else if (isDarkMode) {
                newParams.fontColour = "ffffff";
            } else {
                newParams.fontColour = "37352F";
            }

            if (props?.progressColour) {
                newParams.progressColour = props.progressColour;
            } else if (query.has("progressColour")) {
                newParams.progressColour = query.get("progressColour");
            } else  {
                newParams.progressColour = "000000";
            } 

            return newParams;
        });
        
    }, [isDarkMode, query, props]);

    useEffect(() => {
        console.log(props);
    }, [props])

    return widgetParams;
}