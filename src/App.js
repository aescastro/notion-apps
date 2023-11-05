import { useEffect } from 'react';
import './App.css';
import { Timer } from './Widgets';
import { Home } from './Pages';
import { useDarkLightSwitcher, useQuery } from './utils';
import { Routes, Route } from "react-router-dom";

function App() {
  var isDarkMode = useDarkLightSwitcher(document.body);
  var query = useQuery();
  
  useEffect(() => {

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
  
    var buttons = Array.from(document.getElementsByClassName("access-buttons"));
    if (query.has("buttonBg")) {
      buttons.forEach(button => {
        button.style.backgroundColor = query.get("buttonBg");
      });
    }
  
    var buttonFontColour = "";
    if (query.has("buttonFontColour")) {
      buttonFontColour = query.get("buttonFontColour");
    } else {
      buttonFontColour = "#37352F"
    }

    buttons.forEach(button => {
      button.style.color = buttonFontColour;
    });

    buttons.forEach(button => {
      button.style.borderColor = button.style.color;
    });
  
    document.head.innerHTML = document.head.innerHTML + "<style type='text/css'>*{ " + styleString + "}</style>"
    
  }, [query, isDarkMode]);
  
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Pomodoro-Timer" element={<Timer />} />
      </Routes>
  );
}

export default App;