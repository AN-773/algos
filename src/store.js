import {configureStore} from '@reduxjs/toolkit';
import framesReducer from './Slicers/FrameSlicer'
export default configureStore({
  reducer: {
    frames: framesReducer
  }
})