import {createCells} from "../../components/ui_components/Grid/CellObject";
import {Grid} from "../../components";
import generateMaze from "../MazeGenerator";
import DFSAlgo, {DFSData, DFSFrame} from "./DFSAlgo";
import AlgorithmManager from "../AlgorithmManager";
import React from "react";

export default class DFSAlgoManager extends AlgorithmManager<DFSFrame, DFSData>{

  constructor() {
    super(new DFSAlgo())
  }

  getComponents() {
    console.log("Getting DFS Components");
    
    const {cells, editorLineNumbers} = this.getCurrentFrame()!
    const data = {...this.userData, cells: cells, editorLineNumbers: editorLineNumbers}
    return (
      <div className={"flex gap-5 justify-between"}>
        <div className={"flex flex-grow justify-center items-center"}>
          <Grid data={data} onChange={this.onUserDataChange} className={""}/>
        </div>

      </div>
    )
  }

  getName() {
    return "DFS"
  }

  generateData(): DFSData {
      return (
        {
          cells: generateMaze(createCells(15, 15, 0, 15 * 15 - 1), 15, 15),
          height: 15,
          width: 15,
          startIndex: 0,
          endIndex: 15 * 15 - 1
        }
      )
  }
}