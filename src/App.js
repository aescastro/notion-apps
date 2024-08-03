import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import { ReadingTracker, Timer, Clock } from './widgets';
import { Home } from './pages';
import { setBackgroundColour, useDarkLightSwitcher } from './utils';

function App() {
  const isDarkMode = useDarkLightSwitcher();

  useEffect(() => {
    setBackgroundColour(document.body, isDarkMode);
  }, [isDarkMode]);

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Pomodoro-Timer" element={<Timer />} />
      <Route path="/Reading-Tracker" element={<ReadingTracker/>} />
      <Route path="/Clock" element={<Clock/>} />
    </Routes>
  );
}

export default App;