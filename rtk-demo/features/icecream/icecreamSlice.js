const createSlice = require('@reduxjs/toolkit').createSlice;

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
    }
})

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;