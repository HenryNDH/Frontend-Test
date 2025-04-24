'use client'

import React, {useState} from 'react';
import styles from './test.module.css';
export default function Test (): JSX.Element {

    // State to manage input and to-do items
    const [input, setInput] = useState<string>('');
    const [todos, setTodos] = useState<{ id: number; text: string; editing: boolean }[]>([]);
    
    // Add new to-do item
    const handleAdd = () => {
        //this will trim the input and check if it is empty
        //if it is empty it will alert the user to enter a valid text
        if (input.trim() === '') {
            alert('Please enter a to-do item.');
            return;
        }
        //if the input is not empty it will create a new item and add it to the list
        //it will also reset the input field to empty
        const newItem = {
            id: Date.now(),
            text: input,
            editing: false,
        };
        setTodos([newItem, ...todos]);
        setInput('');
    };

    // Delete item by ID
    const handleDelete = (id: number) => {
        //this will filter the todos array and remove the item with the id passed to it
        //it will also set the todos state to the new array without the deleted item
        setTodos(todos.filter((item) => item.id !== id));
    };

    // Edit item text
    const handleEdit = (id: number, newText: string) => {
        //this will check if the new text is empty and alert the user to enter a valid text
        //if it is not empty it will map through the todos array and update the item with the new text
        if(newText.trim() === '') {
            alert('Please enter a valid text.');
            return;
        }
        //this will map through the todos array and update the item with the new text
        //it will also set the editing state to false
        setTodos(
            todos.map((item) =>
                item.id === id ? { ...item, text: newText, editing: false } : item
            )
        );
    };
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>LetsStopAIDS To-Do List</h2>
            <div className={styles.inputArea}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a new task..."
                    className={styles.input}
                />
                <button onClick={handleAdd} className={styles.addButton}>Add</button>
            </div>

            <ul className={styles.list}>
                {todos.map((item) => (
                    <li key={item.id} className={styles.listItem}>
                        {item.editing ? (
                            <input
                                defaultValue={item.text}
                                onBlur={(e) => handleEdit(item.id, e.target.value)}
                                autoFocus
                            />
                        ) : (
                            <>
                                <span
                                    onDoubleClick={() =>
                                        setTodos(todos.map(t => t.id === item.id ? { ...t, editing: true } : t))
                                    }
                                >
                                    {item.text}
                                </span>
                                <button onClick={() => handleDelete(item.id)} className={styles.deleteButton}>
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};