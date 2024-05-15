import { useEffect, useCallback } from "react";
import { useState } from "react";
import { useReducer } from "react";
import Item from './Todo'


function todosReducer(state, action) {
    switch (action.type) {
        case 'create':
            return [action.item, ...state];
        case 'update':
            return state.map(item => item.id === action.item.id ? action.item : item);
        case 'delete':
            return state.filter(item => item.id !== action.item.id);
        default:
            return state;
    }
}

function Todos() {
    const [list, dispatch] = useReducer(todosReducer, JSON.parse(localStorage.getItem('list') ?? JSON.stringify(Array(0))));
    const [currentItem, setCurrentItem] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const getTime = () => new Date().toLocaleString();
    const id = () => Date.now();

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);

    useEffect(() => {
        if (currentItem)
            setInputValue(currentItem.todo);
        else
            setInputValue('');
    }, [currentItem]);

    const addItem = () => {
        dispatch({
            type: 'create', item: {
                id: id(),
                todo: inputValue.trim() || `Assignment!!!`,
                done: false,
                time: getTime(),
                position: { '--rot': `${Math.floor(Math.random() * 10 - 5)}deg` }
            }
        });
        setInputValue('');
    };

    const editItem = useCallback((item) => {
        currentItem !== item && setCurrentItem(item);
    }, [currentItem, setCurrentItem]);

    const deleteItem = useCallback((item) => {
        dispatch({ type: 'delete', item: item });
    }, [dispatch]);

    const doneEdit = () => {
        dispatch({ type: 'update', item: { ...currentItem, todo: inputValue, time: getTime() } });
        setCurrentItem(null);
    };

    const cancelEdit = () => {
        setCurrentItem(null);
    };

    const toggleCompleteItem = useCallback((item) => {
        dispatch({ type: 'update', item: { ...item, done: !item.done } });
    }, [dispatch]);

    return (
        <>
            <header>
                <section>
                    <h1> ( {list.filter(item => !item.done).length} ) TODOs</h1>
                    <div>
                        <input
                            type="text"
                            className="task-input"
                            placeholder={currentItem ? currentItem.todo : 'Something im mind...'}
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                        <input
                            onClick={currentItem ? doneEdit : addItem}
                            type="button"
                            className=""
                            value={currentItem ? 'Edit' : 'Todo'}
                        />
                        {
                            currentItem && <input
                                className={`cancel ${currentItem ? 'visible' : ''}`}
                                onClick={cancelEdit}
                                type="button"
                                value='Cancel'
                            />
                        }
                    </div>
                </section>
            </header>
            <ul className="todos grid">
                {list.map(item =>
                    <Item
                        key={item.id}
                        data={item}
                        completeItem={toggleCompleteItem}
                        editItem={editItem}
                        deleteItem={deleteItem}
                    />
                )}
            </ul>
        </>
    )
}

export default Todos;