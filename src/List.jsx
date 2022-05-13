import { createContext, useContext, useReducer, useState } from "react";



export default function ShoppingList() {
    const [newItem, setnewItem] = useState('');
    const [isEditing, setIsEditing] = useState(false);



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
