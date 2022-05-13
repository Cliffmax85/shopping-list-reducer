import { createContext, useContext, useReducer, useState } from "react";

const intitialList = [{ id: Date.now(), text: 'Ham Bone', done: false }];

const itemReducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [
                { id: Date.now(), text: action.payload.text, done: false },
                ...state,
            ];
        case 'update':
            return state.map((item) => {
                if (item.id === action.payload.item.id) {
                    const { done, text } = action.payload.item;
                    return {
                        ...item,
                        done,
                        text,
                    };
                }
                return item;
            });
        case 'delete':
            return state.filter((item) => item.id !== action.payload.id);
    }
};

export default function ShoppingList() {
    const [items, dispatch] = useReducer(itemReducer, intitialList);
    const [newItem, setnewItem] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleAddItem = (e) => {
        e.preventDefault();
        dispatch({ type: 'add', payload: { text: newItem } });
        setnewItem('');
    };

    const handleUpdate = (item) => {
        dispatch({ type: 'update', payload: { item } });
    };

    const handleDelete = (id) => {
        dispatch({ type: 'delete', payload: { id } });
    }

    return (
        <>
          <h2>Shopping List</h2>
          <form onSubmit={handleAddItem}>
              <input
                type='text'
                name='newItem'
                placeholder="add a new list item"
                value={newItem}
                onChange={(e) => setnewItem(e.target.value)}
              />
          </form>
          <ul>
              {items.map((item) => (
                  <li key={item.id}>
                      <div>
                          <input type='checkbox'
                          checked={item.done}
                          onChange={(e) => handleUpdate({ ...item, done: e.target.value } )}
                          />
                          {isEditing ? (
                              <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setIsEditing(false);
                                }}
                              >
                                  <input
                                    value={item.text}
                                    onChange={(e) => {
                                        handleUpdate({ ...item, text: e.target.value })
                                    }}
                                  />
                              </form>
                          ) : (
                            item.text
                      )}
                      <button 
                        type='button'
                        onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                      <button
                        type='button'
                        onClick={() => handleDelete(item.id)}
                      >
                          Delete Item
                      </button>
                      </div>
                  </li>
              ))}
          </ul>
        </>
    );
}
