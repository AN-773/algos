import {createCells} from "../../components/ui_components/Grid/CellObject";
import BFSAlgo from "./BFSAlgo";
import {Grid} from "../../components";
import generateMaze from "../MazeGenerator";
import AceEditor from "react-ace";

export default class BFSAlgoManager {

  constructor() {
    this.runAlgorithm = this.runAlgorithm.bind(this)
    this.getComponents = this.getComponents.bind(this)
    this.onDataChange = this.onDataChange.bind(this)
    this.selectNextFrame = this.selectNextFrame.bind(this)
    this.selectPrevFrame = this.selectPrevFrame.bind(this)
    this.selectFrameAt = this.selectFrameAt.bind(this)
    this.data = {
      cells: generateMaze(createCells(15, 15, 0, 15 * 15 - 1), 15, 15),
      editorLineNumbers: {stack: 0},
      height: 15,
      width: 15,
      start: 0,
      end: 15 * 15 - 1
    }
    this.frames = [this.data]
    this.currentFrame = 0;
    this.runAlgorithm()
  }

  getComponents() {
    console.log("Getting comp: ", this.currentFrame)
    const {cells, editorLineNumbers} = this.frames[this.currentFrame];
    const data = {...this.data, cells: cells, editorLineNumbers: editorLineNumbers}
    return (
      <div className={"flex gap-5 justify-between"}>
        <div className={"flex flex-grow justify-center items-center"}>
          <Grid data={data} onChange={this.onDataChange} className={""}/>
        </div>

      </div>
    )
  }

  selectNextFrame() {
    if (this.currentFrame === this.frames.length - 1)
      return false
    this.currentFrame++;
    return true
  }

  selectPrevFrame() {
    if (this.currentFrame === 0)
      return false
    this.currentFrame--;
    return true
  }

  selectFrameAt(index) {
    if (index < 0 || index >= this.frames.length)
      return false
    this.currentFrame = index;
    return true
  }

  getFramesSize() {
    return this.frames.length
  }

  onDataChange(newData) {
    this.data = newData;
    this.runAlgorithm();
    this.onDataChangeListner && this.onDataChangeListner();
  }

  runAlgorithm() {
    this.algo = new BFSAlgo(this.data)
    this.frames = this.algo.start()
    this.currentFrame = 0;
  }

  setDataChangeListener(onDataChange) {
    this.onDataChangeListner = onDataChange;
  }

}