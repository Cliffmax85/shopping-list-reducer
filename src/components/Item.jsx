import { useState } from "react";

export default function Item({ item, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    
    let content;

    if (isEditing) {
        content = (
            <form onSubmit={(event) => { event.preventDefault(); setIsEditing(false); }} >
                <input 
                aria-label='edit input' 
                value={item.text}
                onChange={(e) => onUpdate({ ...item, text: e.target.value })}></input>
                <button aria-label='save edits'>
                    Save
                </button>  
            </form>
        )
    } else {
        content = (
            <>
            <p style={{ textDecoration: item.done ? 'line-through' : null }}>
                {item.text}
            </p>
            <button
                aria-label={`edit button`}
                type='button'
                onClick={() => setIsEditing(true)}>
                    Edit
                </button>
            </>
        )
    }

  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input 
        type='checkbox' 
        checked={item.done} 
        onChange={(e) => {
        onUpdate({ ...item, done: e.target.checked });
        }} />
        {content}
        <button 
        aria-label={`delete button`} 
        type='button' 
        onClick={() => onDelete(item.id)} >
            Delete Item
        </button>
    </div>
    </>
)
}