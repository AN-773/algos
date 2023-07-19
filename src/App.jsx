import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import React, { useState } from "react";
import { FPlayer } from "./components/logical_components/FramesPlayer/FramesPlayer";
import DFSAlgoManager from "./algorithms/dfs/DFSAlgoManager";
import BFSAlgoManager from "./algorithms/bfs/BFSAlgoManager";
import { ThemeProvider } from "@mui/material";

function App() {
  const algos = [new BFSAlgoManager(), new DFSAlgoManager()];
  return (
    <>
      <CssBaseline enableColorScheme={true} />
      <div className="App">
        <AppBar />
        <FPlayer algorithms={algos} />
      </div>
    </>
  );
}

export default App;
