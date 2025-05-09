import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import { ReadingTracker, Timer, Clock } from './Widgets';
import { Home, AboutUs, Contact, Builder } from './Pages';
import { setBackgroundColour, useDarkLightSwitcher } from './utils';
import { LINKS } from './constants'

function App() {
  const isDarkMode = useDarkLightSwitcher();

  useEffect(() => {
    setBackgroundColour(document.body, isDarkMode);
  }, [isDarkMode]);

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Pomodoro-Timer" element={<Timer/>} />
      <Route path="/Reading-Tracker" element={<ReadingTracker/>} />
      <Route path="/Clock" element={<Clock/>} />
      <Route path={LINKS.ABOUT} element={<AboutUs/>}/>
      <Route path={LINKS.CONTACT} element={<Contact/>}/>
      <Route path={LINKS.BUILDER} element={<Builder/>}/>
    </Routes>
  );
}

export default App;