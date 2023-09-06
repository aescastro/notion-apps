import { useEffect,  } from 'react';
import './App.css';
import { Timer } from './Widgets';

function App() {

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var styleString = "";
    if (urlParams.has("font")) {
      styleString += "font-family: " + urlParams.get("font") + "!important;"
    }
  
    if (urlParams.has("bg")) {
      let root = document.getElementById("root");
      root.style.backgroundColor = urlParams.get("bg");
      document.body.style.backgroundColor = urlParams.get("bg");
    }
  
    if (urlParams.has("fontColour")) {
        styleString += "color: " + urlParams.get("fontColour");
    }
  
    var buttons = Array.from(document.getElementsByClassName("access-buttons"));
    if (urlParams.has("buttonBg")) {
      buttons.forEach(button => {
        button.style.backgroundColor = urlParams.get("buttonBg");
      });
    }
  
    if (urlParams.has("buttonFontColour")) {
      buttons.forEach(button => {
        button.style.color = urlParams.get("buttonFontColour");
      });
    }

    buttons.forEach(button => {
      button.style.borderColor = button.style.color;
    });
  
    document.head.innerHTML = document.head.innerHTML + "<style type='text/css'>*{ " + styleString + "}</style>"
  }, []);
  
  return (
    <>
    <Timer/>
    </>
  );
}

export default App;
