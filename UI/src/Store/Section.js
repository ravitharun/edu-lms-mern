
import { createSlice, configureStore } from '@reduxjs/toolkit'

const SectionSlicer = createSlice({
    name: 'counter',
    initialState: {
        value: ''
    },
    reducers: {
        incremented: (state,action) => {
   
            state.value =action.payload
        },
        decremented: (state) => {
            state.value -= 1
        }
    }
})

export const { incremented, decremented } = SectionSlicer.actions
export default SectionSlicer.reducer