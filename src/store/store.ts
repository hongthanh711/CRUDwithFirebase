import { configureStore } from '@reduxjs/toolkit'
import { shoesSlice } from './shoesSlice'

export const store = configureStore({
    reducer: {
        shoes: shoesSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
