import { createSlice } from '@reduxjs/toolkit'

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    currentLocation: null,
    visited: [],
    currentPlaylist: null,
  },
  reducers: {
    gotoLocation(state, action) {
      if (state.currentLocation !== null && !state.visited.includes(state.currentLocation)) {
        state.visited = [...state.visited, state.currentLocation]
      }
      state.currentLocation = action.payload.locationName
      if (action.payload.playlistName !== undefined) {
        state.currentPlaylist = action.payload.playlistName
      }
    }
  }
})

export const { gotoLocation } = locationSlice.actions
export default locationSlice.reducer