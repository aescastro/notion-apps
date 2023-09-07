import { useState, useEffect } from "react"
export const useDarkLightSwitcher = (element) => {
    const [isDarkMode, setIsDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    useEffect(() => {
        if (isDarkMode) {
            element.style.backgroundColor = '#191919';
        } else {
            element.style.backgroundColor = '#ffffff';
        }
    }, [isDarkMode, element.style]);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches}) => {
        setIsDarkMode(matches);
    });

    return isDarkMode;
}