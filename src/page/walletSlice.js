import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: [],
  },
  reducers: {
    saveWallet: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { saveWallet } = counterSlice.actions

export const selectCount = (state) => state.counter.value

export default counterSlice.reducer
