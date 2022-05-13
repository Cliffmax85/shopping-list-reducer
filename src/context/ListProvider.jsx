import {createContext, useContext, useReducer } from 'react';


const intitialList = [{ id: Date.now(), text: 'Ham Bone', done: false }];

const itemReducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [
                ...state, { id: Date.now(), text: action.payload.text, done: false },
                
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
        case 'delete_all':
            return [{ id: null, text: null, done: null}];
    }
};

const ListContext = createContext();


export function ListProvider({ children }) {
    const [items, dispatch] = useReducer(itemReducer, intitialList);

    const handleAddItem = (text) => {
        dispatch({ type: 'add', payload: { text } });
    };

    const handleUpdate = (item) => {
        dispatch({ type: 'update', payload: { item } });
    };

    const handleDelete = (id) => {
        dispatch({ type: 'delete', payload: { id } });
    };

    const handleDeleteAll = () => {
        dispatch({ type: 'delete_all', payload: {} })
    }
    // empty array might not work here?

    return (
        <ListContext.Provider
          value={{ items, handleAddItem, handleUpdate, handleDelete, handleDeleteAll }}>
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
