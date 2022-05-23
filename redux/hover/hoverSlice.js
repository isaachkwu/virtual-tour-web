import { createSlice } from '@reduxjs/toolkit'

const hoverSlice = createSlice({
  name: 'hover',
  initialState: {
    hoverHotspotName: null
  },
  reducers: {
    hover(state, action) {
      state.hoverHotspotName = action.payload.name
    },
    quitHover(state, action) {
      state.hoverHotspotName = null
    }
  }
})

export const { hover, quitHover } = hoverSlice.actions
export default hoverSlice.reducer