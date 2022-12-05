import { createSlice, current, nanoid } from '@reduxjs/toolkit'

export const createFave = (fave, name) => ({
  id: nanoid(),
  rating: 5,
  name,
  ...fave,
})
const initialState = []

export const favesSlice = createSlice({
  name: 'faves',
  initialState,
  reducers: {
    addFave: (state, action) => {
      const name = action.payload.name ? action.payload.name : action.payload.title ? action.payload.title : 'no name'
      if (!state.some(fave => fave.name === name)) {
        const fave = createFave(action.payload, name)
        state.push(fave)
      }
    },
    updateFave: (state, action) => {
      // find fave
      // update fave with array of ids if none exists,
      // or add related id if doesn't exist in array already
      // return state
    },
    rateFave: (state, action) => {
      state.find(fave => fave.id === action.payload.id).rating = action.payload.rating
    },
    removeFave: (state, action) => {
      return state.filter(fave => fave.id !== action.payload)
    },
  },
})

export const { addFave, removeFave, rateFave } = favesSlice.actions
export const selectFaveState = state => state.faves
