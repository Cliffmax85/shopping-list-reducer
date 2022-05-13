import {createContext, useContext, useReducer } from 'react';


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

const ListContext = createContext();


export function ListProvider({ children }) {
    const [items, dispatch] = useReducer(itemReducer, intitialList);

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
    };

    return (
        <ListContext.Provider
          value={{ items, handleAddItem, handleUpdate, handleDelete }}>
          {children}
        </ListContext.Provider>
    );
}

export const useList = () => {
    const context = useContext(ListContext);
    if (context === undefined)
      throw new Error('useList must be call from within a ListProvider');

    return context;
}
