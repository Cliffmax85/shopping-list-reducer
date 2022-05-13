import { createContext, useContext, useReducer, useState } from "react";
import Item from "./components/Item";
import { useList } from "./context/ListProvider";



export default function ShoppingList() {
    const [newItem, setnewItem] = useState('');
    const { items, handleAddItem, handleUpdate, handleDelete } = useList();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddItem(newItem);

        setnewItem('');
    } 

    return (
        <>
          <h2>Shopping List</h2>
          <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='newItem'
                placeholder="add a new list item"
                value={newItem}
                onChange={(e) => setnewItem(e.target.value)} />
          </form>
          <ul>
            {items.map((item) => (
                <li key={item.id}>
                <Item item={item}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                />
                </li>
                ))}
          </ul>
        </>
    )
}