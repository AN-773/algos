import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import React, {useState} from "react";
import {FPlayer} from "./components/logical_components/FramesPlayer/FramesPlayer";
import DFSAlgoManager from "./algorithms/dfs/DFSAlgoManager";

function App() {

  const [manager, setManager] = useState(new DFSAlgoManager())
  return (
    <>
      <CssBaseline enableColorScheme={true}/>
      <div className="App">
        <AppBar/>
        <FPlayer algorithmManager={manager}/>
      </div>
    </>
  );

}

export default App;
