import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../store/asyncThunks';

const TodoForm = () => {
    const inputRef = useRef();

    const dispatch = useDispatch();

    const formSubmitHandler = e => {
        e.preventDefault();

        const value = inputRef.current.value;
        if (!value) return;
        dispatch(addTodoAsync({ text: value, isCompleted: false }));
        inputRef.current.value = '';
    };

    return (
        <form onSubmit={formSubmitHandler}>
            <input type="text" ref={inputRef} />
        </form>
    );
};

export default TodoForm;
