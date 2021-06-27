import { configureStore, createSlice } from '@reduxjs/toolkit';
import { getTodosAsync, addTodoAsync, toggleCompleteAsync, deleteTodoAsync } from './asyncThunks';

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action) => {
            return action.payload.todos;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            state[index].isCompleted = action.payload.isCompleted;
        },
        [deleteTodoAsync.fulfilled]: (state, action) => {
            return state.filter(todo => todo.id !== action.payload.id);
        },
    },
});

const store = configureStore({
    reducer: { todos: todoSlice.reducer },
});

export default store;
