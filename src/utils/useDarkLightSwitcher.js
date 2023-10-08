import { useState, useEffect } from "react"

export const setBackgroundColour = (element, isDarkMode) => {
    if (isDarkMode) {
        element.style.backgroundColor = '#191919';
    } else {
        element.style.backgroundColor = '#ffffff';
    }
}

export const useDarkLightSwitcher = (element) => {
    const [isDarkMode, setIsDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    useEffect(() => {
        setBackgroundColour(element, isDarkMode);
    }, [isDarkMode, element.style, element]);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches}) => {
        setIsDarkMode(matches);
    });

    return isDarkMode;
}