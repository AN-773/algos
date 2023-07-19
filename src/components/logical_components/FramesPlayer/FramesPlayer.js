import {useState} from "react";
import Animator from "../../../utiles/Animator";
import {Player} from "../../ui_components/Player/Player"
import useForceUpdate from "../../../utiles/useForceUpdate";

export const FPlayer = ({algorithms}) => {

  console.log("In fplayer comp")
  const forceUpdate = useForceUpdate();
  const [animator] = useState(new Animator(nextAnimationFrame))
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);

  console.log("State", selectedAlgorithm);

  function nextAnimationFrame() {
    if (algorithms[selectedAlgorithm].selectNextFrame())
      forceUpdate()
    else {
      stopAnimation()
      return false
    }
    return true
  }

  function prevAnimationFrame() {
    if (algorithms[selectedAlgorithm].selectPrevFrame())
      forceUpdate()
  }

  function setAnimationSpeed(speed) {
    animator.setSpeed(speed)
    forceUpdate()
  }

  function moveToFrame(index) {
    if (algorithms[selectedAlgorithm].selectFrameAt(index))
      forceUpdate()
  }

  animator.setUpdateListener(nextAnimationFrame)

  function onDataChange() {
    stopAnimation()
  }

  function startAnimation() {
    animator.start()
    forceUpdate()
  }

  function stopAnimation() {
    animator.stop()
    forceUpdate()
  }

  function changeAlgorithm(index) {
    algorithms[index].reset();
    setSelectedAlgorithm(index)
  }

  algorithms[selectedAlgorithm].setAlgoDataChangeListener(onDataChange)

  return (
    <div className={"pt-8"}>
      {algorithms[selectedAlgorithm].getComponents()}
      <Player className={" absolute w-3/6 mb-1 bottom-0 left-1/2 transform -translate-x-1/2"}
              start={startAnimation}
              stop={stopAnimation}
              moveTo={moveToFrame}
              nextFrame={nextAnimationFrame}
              changeSpeed={setAnimationSpeed}
              speed={animator.getSpeed()}
              prevFrame={prevAnimationFrame}
              framesSize={algorithms[selectedAlgorithm].getFramesSize()}
              currentFrame={algorithms[selectedAlgorithm].getCurrentFrameIndex()}
              playing={animator.isPlaying()}
              algorithms={algorithms}
              selectedAlgorithm={selectedAlgorithm}
              changeAlgorithm={changeAlgorithm}/>
    </div>
  )

}