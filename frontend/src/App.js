import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import OpenSheetMusicDisplay from './components/OpenSheetMusicDisplay'
import VexFlowComponent from './components/VexFlowComponent'


const App = () => {
    const [file, setFile] = useState("MuzioClementi_SonatinaOpus36No1_Part2.xml")

  const handleClick = (event) =>{
    setFile(event.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">OpenSheetMusicDisplay in React</h1>
      </header>
      <select onChange={handleClick}>
        <option value="MuzioClementi_SonatinaOpus36No1_Part2.xml">Muzio Clementi: Sonatina Opus 36 No1 Part2</option>
        <option value="Beethoven_AnDieFerneGeliebte.xml">Beethoven: An Die FerneGeliebte</option>
      </select>
      <OpenSheetMusicDisplay file={file} />
      {/* <VexFlowComponent /> */}
    </div>
  );
}

export default App;
