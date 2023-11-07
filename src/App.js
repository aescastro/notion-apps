import { useEffect } from 'react';
import './App.css';
import { ReadingTracker, Timer } from './widgets';
import { Home } from './pages';
import { useDarkLightSwitcher, setBackgroundColour, useQuery } from './utils';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  var isDarkMode = useDarkLightSwitcher();
  var query = useQuery();
  
  useEffect(() => {
    setBackgroundColour(document.body, isDarkMode);
    var styleString = "";
    if (query.has("font")) {
      styleString += "font-family: " + query.get("font") + "!important;"
    }

    var content = document.getElementById("widget");
    if (query.has("bg")) {
      content.style.backgroundColor = query.get("bg");
    }
  
    if (query.has("fontColour")) {
      styleString += "color: " + query.get("fontColour");
    } else if (isDarkMode) {
      styleString += "color: #ffffff";
    } else {
      styleString += "color: #37352F";
    }
  
    document.head.innerHTML = document.head.innerHTML + "<style type='text/css'>*{ " + styleString + "}</style>"
    
  }, [query, isDarkMode]);
  
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Pomodoro-Timer" element={<Timer />} />
        <Route path="/Reading-Tracker" element={<ReadingTracker/>} />
      </Routes>
  );
}

export default App;