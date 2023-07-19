import {createSlice} from "@reduxjs/toolkit";

export const framesSlicer = createSlice({
  name: "frames",
  initialState: {
    frames: [],
    components: [],
    data: {},
    currentFrame: -1
  },
  reducers: {
    nextFrame: state => {
      if (state.currentFrame !== state.frames.length - 1)
        state.currentFrame++;
    },
    prevFrame: state => {
      if (state.currentFrame !== 0)
        state.currentFrame--;
    },
    setFrames: (state, action) => {
      state.frames = action.payload.frames;
      state.components = action.payload.components;
      state.currentFrame = 0;
    },
    updateData: (state, action) => {
      state.data = {...state.data, ...action.payload.data}
    }
  },
})

export const {nextFrame, prevFrame, setFrames} = framesSlicer.actions;
export default framesSlicer.reducer