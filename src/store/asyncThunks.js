import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async payload => {
    const res = await fetch('https://reatct-todo-default-rtdb.firebaseio.com/todos.json');
    if (res.ok) {
        const todos = await res.json();

        let loadedTodos = [];

        for (let key in todos) {
            loadedTodos.push({
                id: key,
                text: todos[key].text,
                isCompleted: todos[key].isCompleted,
            });
        }
        return { todos: loadedTodos };
    }
});

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async payload => {
    const res = await fetch('https://reatct-todo-default-rtdb.firebaseio.com/todos.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        const key = await res.json();

        return { ...payload, id: key.name };
    }
});

export const toggleCompleteAsync = createAsyncThunk('todos/toggleCompleteAsync', async payload => {
    const res = await fetch(
        `https://reatct-todo-default-rtdb.firebaseio.com/todos/${payload.id}.json`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: payload.text, isCompleted: payload.isCompleted }),
        }
    );

    if (res.ok) {
        return { isCompleted: payload.isCompleted, id: payload.id };
    }
});

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async payload => {
    const res = await fetch(
        `https://reatct-todo-default-rtdb.firebaseio.com/todos/${payload.id}.json`,
        {
            method: 'DELETE',
        }
    );

    if (res.ok) {
        return { id: payload.id };
    }
});
