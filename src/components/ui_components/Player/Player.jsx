import {IconButton, Slider} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import './player.scss'

export const Player = ({
                         start,
                         stop,
                         moveTo,
                         currentFrame,
                         framesSize,
                         className,
                         playing,
                         nextFrame,
                         changeSpeed,
                         speed,
                         prevFrame
                       }) => {

  function handleFrameChange(event) {
    moveTo(event.target.value)
  }

  function handleSpeedChange(event) {
    changeSpeed((100 - event.target.value) * 10)
  }

  function handleClick() {
    playing ? stop() : start()
  }

  return (
    <div className={className + " gap-5 items-center rounded-xl p-4 bg-[#3D494D4C]"}>
      <Slider type="range"
              id="frames-slider"
              value={currentFrame}
              min={0}
              max={framesSize - 1}
              step={1}
              onChange={handleFrameChange}
              valueLabelDisplay="auto"
              aria-label="Temperature"
              makrs/>
      <div className="flex justify-center items-center gap-3">
        <IconButton onClick={prevFrame} className={"min-w-[20px] max-w-[20px]"} style={{color: "#fff"}}>
          <FontAwesomeIcon icon={faStepBackward}/>
        </IconButton>
        <IconButton onClick={handleClick} className={"min-w-[20px] max-w-[20px]"} style={{color: "#fff"}}>
          {playing ? <FontAwesomeIcon icon={faPause}/> : <FontAwesomeIcon icon={faPlay}/>}
        </IconButton>
        <IconButton onClick={nextFrame} className={"min-w-[20px] max-w-[20px]"} style={{color: "#fff"}}>
          <FontAwesomeIcon icon={faStepForward}/>
        </IconButton>
        <div className={"speed-slider-container flex items-center"}>
          <Slider type="range"
                  id="speed-slider"
                  value={100 - (speed / 10)}
                  min={0}
                  max={95}
                  step={5}
                  onChange={handleSpeedChange}
                  aria-label="Temperature"
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value, index) => (<span>{(100-value)/100}s</span>)}
                  marks
          />
          <p id={"speed"}>Speed</p>
        </div>
      </div>
    </div>
  )
}