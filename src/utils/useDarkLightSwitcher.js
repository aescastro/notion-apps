import { useState } from "react"

export const setBackgroundColour = (element, isDarkMode) => {
    if (isDarkMode) {
        element.style.backgroundColor = '#191919';
    } else {
        element.style.backgroundColor = '#ffffff';
    }
}

export const useDarkLightSwitcher = () => {
    const [isDarkMode, setIsDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches}) => {
        setIsDarkMode(matches);
    });

    return isDarkMode;
}