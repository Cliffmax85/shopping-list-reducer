import { useState } from "react";

export default function Item({ item, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    
    let content;

    if (isEditing) {
        content = (
            <form onSubmit={(event) => { event.preventDefault(); setIsEditing(false); }} >
                <input aria-label='edit input' value={item.text} onChange={(e) => onUpdate({ ...item, text: e.target.value })}></input>
                <button aria-label='save edits'>Save</button>  
            </form>
        )
    } else {
        content = (
            <button aria-label={`edit button`} type='button' onClick={() => setIsEditing(true)} >Edit</button>
        )
    }

  return (
    <>
        <input type='checkbox' checked={item.done} onChange={(e) => {
            onUpdate({ ...item, done: e.target.checked });
        }} />
        {item.text}
        {content}
        <button aria-label={`delete button`} type='button' onClick={() => onDelete(item.id)} >Delete Item</button>
    </>
)
}