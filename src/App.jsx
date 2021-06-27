import { useDispatch, useSelector } from 'react-redux';
import { getTodosAsync } from './store/asyncThunks';
import './App.css';

import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import { useEffect } from 'react';

function App() {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);

    return (
        <div className="app">
            <div className="todo-list">
                {todos.map(todo => (
                    <Todo id={todo.id} key={todo.id} todo={todo} />
                ))}
                <TodoForm />
            </div>
        </div>
    );
}

export default App;
