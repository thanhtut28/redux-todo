import { useDispatch } from 'react-redux';
import { toggleCompleteAsync, deleteTodoAsync } from '../store/asyncThunks';

const Todo = ({ todo }) => {
    const dispatch = useDispatch();

    const completeTodo = () => {
        dispatch(
            toggleCompleteAsync({ text: todo.text, id: todo.id, isCompleted: !todo.isCompleted })
        );
    };

    const removeTodo = () => {
        dispatch(deleteTodoAsync({ id: todo.id }));
    };

    return (
        <div className="todo" style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}>
            {todo.text}

            <div>
                <button onClick={completeTodo}>Complete</button>
                <button onClick={removeTodo}>Remove</button>
            </div>
        </div>
    );
};

export default Todo;
