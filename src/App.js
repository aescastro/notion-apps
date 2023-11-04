import { useEffect } from 'react';
import './App.css';
import { Timer } from './Widgets';
import { Home } from './Pages';
import { useDarkLightSwitcher } from './utils';
import { Routes, Route } from "react-router-dom";

function App() {
  var isDarkMode = useDarkLightSwitcher(document.body);
  
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    var styleString = "";
    if (urlParams.has("font")) {
      styleString += "font-family: " + urlParams.get("font") + "!important;"
    }

    var content = document.getElementById("widget");
    if (urlParams.has("bg")) {
      content.style.backgroundColor = urlParams.get("bg");
    }
  
    if (urlParams.has("fontColour")) {
      styleString += "color: " + urlParams.get("fontColour");
    } else if (isDarkMode) {
      styleString += "color: #ffffff";
    } else {
      styleString += "color: #37352F";
    }
  
    var buttons = Array.from(document.getElementsByClassName("access-buttons"));
    if (urlParams.has("buttonBg")) {
      buttons.forEach(button => {
        button.style.backgroundColor = urlParams.get("buttonBg");
      });
    }
  
    var buttonFontColour = "";
    if (urlParams.has("buttonFontColour")) {
      buttonFontColour = urlParams.get("buttonFontColour");
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
    
  }, [isDarkMode]);
  
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Pomodoro-Timer" element={<Timer />} />
      </Routes>
  );
}

export default App;