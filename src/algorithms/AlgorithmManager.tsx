import Algorithm from "./Algorithm";
import {ReactElement} from "react";

export default abstract class AlgorithmManager<FrameType, DataType> {

  protected userData: DataType
  private frames: FrameType[] = []
  private onAlgoDataChangeListener?: () => void
  private currentFrame = 0

  protected constructor(private algo: Algorithm<FrameType, DataType>) {
    this.runAlgorithm = this.runAlgorithm.bind(this)
    this.onUserDataChange = this.onUserDataChange.bind(this)
    this.generateData = this.generateData.bind(this)
    this.userData = this.generateData();
    this.reset()
  }

  private runAlgorithm() {
    this.frames = this.algo.start(this.userData)
    this.currentFrame = 0;
  }

  protected onUserDataChange(data: DataType) {
    this.userData = data;
    this.runAlgorithm()
    this.onAlgoDataChangeListener && this.onAlgoDataChangeListener()
  }

  reset() {
    this.userData = this.generateData();
    this.runAlgorithm()
  }

  selectNextFrame() {
    if (!this.frames || this.currentFrame === this.frames.length - 1)
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

  selectFrameAt(index: number) {
    if (!this.frames || index < 0 || index >= this.frames.length)
      return false
    this.currentFrame = index;
    return true
  }

  getFramesSize() {
    return this.frames ? this.frames.length : 0
  }

  public getCurrentFrameIndex(): number {
    return this.currentFrame;
  }
  protected getCurrentFrame(): FrameType | null{
    return this.frames ? this.frames[this.currentFrame] : null
  }

  setAlgoDataChangeListener(onChange: () => void) {
    this.onAlgoDataChangeListener = onChange;
  }


  abstract getComponents(): ReactElement

  abstract getName(): string

  abstract generateData(): DataType


}