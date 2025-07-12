import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material';

import { ReadingTracker, Timer, Clock } from './Widgets';
import { Home, AboutUs, Contact, Builder } from './Pages';
import { setBackgroundColour, useDarkLightSwitcher } from './utils';
import { LINKS, theme } from './constants'

function App() {
  const isDarkMode = useDarkLightSwitcher();
  //TODO make hook that gets widget props here instead of manually extracting in every widget

  useEffect(() => {
    setBackgroundColour(document.body, isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pomodoro-Timer" element={<Timer />} />
        <Route path="/Reading-Tracker" element={<ReadingTracker />} />
        <Route path="/Clock" element={<Clock />} />
        <Route path={LINKS.ABOUT} element={<AboutUs />} />
        <Route path={LINKS.CONTACT} element={<Contact />} />
        <Route path={LINKS.BUILDER} element={<Builder />} />
      </Routes>
    </ThemeProvider>

  );
}

export default App;