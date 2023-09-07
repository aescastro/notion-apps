
export const useDarkLightSwitcher = (element) => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const setBgColor = (isDarkMode) => {
        if (isDarkMode) {
            element.style.backgroundColor = '#2F3438 ';
        } else {
            element.style.backgroundColor = '#ffffff';
        }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches}) => {
        setBgColor(matches);
    });

    setBgColor(isDarkMode);
    return;
}