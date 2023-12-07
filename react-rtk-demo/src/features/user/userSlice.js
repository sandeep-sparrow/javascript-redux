import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// return pending, fullfilled, rejected state
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.data);
});

const intialState= {
    loading: false,
    users: [],
    error: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState: intialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = '';
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        });
    }
});

export default userSlice.reducer;
export const { ordered, restocked} =  userSlice.actions;