import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MessageState {
    type: string | null,
    message: string | null,
}

const state = {
    message: null,
    type: null,
} as MessageState

export const messageSlice = createSlice({
    name: 'message',
    initialState: state,

    reducers: {
        displayMessage: (state, action: PayloadAction<MessageState>) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
    }
});

export const { displayMessage } = messageSlice.actions;

export default messageSlice.reducer;
