import { useState, useEffect, useRef } from "react"
import { NOTION_BACKGROUNDS } from "../constants";
import { useQuery } from "./useQuery";

export const setBackgroundColour = (element, isDarkMode) => {
    if (isDarkMode) {
        element.style.backgroundColor = NOTION_BACKGROUNDS.darkMode;
    } else {
        element.style.backgroundColor = NOTION_BACKGROUNDS.lightMode;
    }
}

export const useDarkLightSwitcher = () => {
    const query = useQuery();
    const [forcedMode, setForcedMode] = useState();
    const [isDarkMode, setIsDarkMode] = useState();
    const forcedModeRef = useRef();

    useEffect(() => {
        forcedModeRef.current = forcedMode; // Update the ref whenever forcedMode changes
    }, [forcedMode]);

    useEffect(() => {
        const handleDarkModeChange = ({ matches }) => {
            if (!forcedModeRef.current) {
                setIsDarkMode(matches);
            }
        };

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleDarkModeChange);

        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleDarkModeChange);
        };
    }, []);

    useEffect(() => {
        setForcedMode(query.has("mode") ? query.get("mode") : null);
    }, [query]);

    useEffect(() => {
        if (!forcedMode) {
            setIsDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        } else {
            setIsDarkMode(forcedMode === "dark");
        }
    }, [forcedMode]);

    return isDarkMode;
};
