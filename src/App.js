import './App.css';
import { Timer } from './Widgets';

function App() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if (urlParams.has("bg")) {
    let root = document.getElementById("root");
    root.style.backgroundColor = urlParams.get("bg");
    document.body.style.backgroundColor = urlParams.get("bg");
  }
  
  var styleString = "";
  if (urlParams.has("font")) {
      styleString += "font-family: " + urlParams.get("font") + "!important;"
  }

  if (urlParams.has("fontColour")) {
      styleString += "color: " + urlParams.get("fontColour") + "!important;"
      
      var buttons = document.getElementsByClassName("access-buttons");
      for (let i = 0; i < buttons.length; i++) {
          buttons[i].style.borderColor = urlParams.get("fontColour");
      }
  }

  document.head.innerHTML = document.head.innerHTML + "<style type='text/css'>*{ " + styleString + "}</style>"
  return (
    <Timer minutes={25} seconds={0} sessions={0}></Timer>
  );
}

export default App;
