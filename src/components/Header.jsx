import { useList } from "../context/ListProvider";


export default function Header() {
    const { items, handleDeletAll } = useList();

    return (
        <>
          <div>
              Items on List: {items.length}
          </div>
          <button onClick={handleDeletAll}>
              Clear List
          </button>
        </>
    )
}