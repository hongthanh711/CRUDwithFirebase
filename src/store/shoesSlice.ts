import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import { RootState } from './store'
import { ShoesType } from '../interfaces/shoes.type'
import { db } from '../lib/init-firebase'
import { doc, updateDoc } from 'firebase/firestore'

interface ShoesState {
    editItem: ShoesType | null
}

const initialState: ShoesState = {
    editItem: null,
}

export const shoesSlice = createSlice({
    name: 'shoes',
    initialState,
    reducers: {
        // increment: (state) => {
        //     state.value += 1
        // },
        // Use the PayloadAction type to declare the contents of `action.payload`
        // editItem: (state, action: PayloadAction<string>) => {
        //     state.value += action.payload
        // },
        startEditItem: (state, action: PayloadAction<ShoesType>) => {
            state.editItem = action.payload
        },
        cancelEditItem: (state) => {
            state.editItem = null
        },
        finishEditItem: (state, action: PayloadAction<ShoesType>) => {
            const docRef = doc(db, 'shoes', action.payload.id)
            const name = action?.payload?.name
            updateDoc(docRef, { name })
            state.editItem = null
        },
    },
})

// export const { increment, decrement, incrementByAmount } = shoesSlice.actions
export const { startEditItem, cancelEditItem, finishEditItem } = shoesSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default shoesSlice.reducer
