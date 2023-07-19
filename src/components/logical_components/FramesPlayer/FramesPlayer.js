import {useState} from "react";
import Animator from "../../../utiles/Animator";
import {flushSync} from "react-dom";
import {Player} from "../../ui_components/Player/Player"
import useForceUpdate from "../../../utiles/useForceUpdate";

export const FPlayer = ({algorithmManager}) => {

  console.log("In fplayer comp")
  const forceUpdate = useForceUpdate();
  const [animator, setAnimator] = useState(new Animator(nextAnimationFrame))

  function nextAnimationFrame() {
    if (algorithmManager.selectNextFrame())
      forceUpdate()
    else {
      stopAnimation()
      return false
    }
    return true
  }

  function prevAnimationFrame() {
    if (algorithmManager.selectPrevFrame())
      forceUpdate()
  }

  function setAnimationSpeed(speed) {
    animator.setSpeed(speed)
    forceUpdate()
  }

  function moveToFrame(index) {
    if (algorithmManager.selectFrameAt(index))
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

  algorithmManager.setAlgoDataChangeListener(onDataChange)

  return (
    <div className={"pt-8"}>
      {algorithmManager.getComponents()}
      <Player className={" absolute w-3/6 mb-1 bottom-0 left-1/2 transform -translate-x-1/2"}
              start={startAnimation}
              stop={stopAnimation}
              moveTo={moveToFrame}
              nextFrame={nextAnimationFrame}
              changeSpeed={setAnimationSpeed}
              speed={animator.getSpeed()}
              prevFrame={prevAnimationFrame}
              framesSize={algorithmManager.getFramesSize()}
              currentFrame={algorithmManager.getCurrentFrameIndex()}
              playing={animator.isPlaying()}/>
    </div>
  )

}