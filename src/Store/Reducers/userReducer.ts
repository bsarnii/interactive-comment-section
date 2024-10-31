import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user.interface";
import { RootState } from "../store";

interface UserData{
    user: User
    loading: boolean;
    error: string | null
}

const initialState:UserData = {
    user: {username: '', img: ''},
    loading: false,
    error: null
} 

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        }
    }
})

export const {setLoading, setError, setUser} = userSlice.actions;

export const userReducer = userSlice.reducer;

export const selectUserState = (state:RootState) => state.user;

export const selectUser = createSelector([(state: RootState) => selectUserState(state)], (user) => user.user);

export const selectIsLoggedIn = createSelector(
    [selectUser], (user) => !!user.username
)