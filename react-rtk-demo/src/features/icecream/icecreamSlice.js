import { createSlice } from '@reduxjs/toolkit';
import { ordered as cakeOrdered } from '../cake/cakeSlice';

const initialState = {
    numOfIcecream: 10
}

const icecreamSlice = createSlice({
    name: 'icecream',
    initialState: initialState,
    reducers: {
        ordered: state => {
            state.numOfIcecream--;
        },
        restocked: (state, action) => {
            state.numOfIcecream += action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(cakeOrdered, state => {
            state.numOfIcecream--;
        })
    }
})

export default icecreamSlice.reducer;
export const { ordered, restocked} =  icecreamSlice.actions;