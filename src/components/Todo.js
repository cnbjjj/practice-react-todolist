import { memo } from "react";
import { SlCheck, SlTrash, SlPencil } from "react-icons/sl";

function Item({ data, editItem, deleteItem, completeItem }) {
    return (
        <li
            id={data.id}
            style={{ ...data.position }}
            className={`todo flex justify-between ${data.done ? 'done' : ''}`}
        >
            <div className="" onClick={() => completeItem(data)}>
                <h3>{data.todo}</h3>
            </div>
            <div className="grid items-center justify-center">
                <span className="time">{`${data.time}`}</span>
                <div className="flex gap-10 justify-center">
                    <SlCheck onClick={() => completeItem(data)} className="icon" />
                    <SlPencil onClick={() => editItem(data)} className="icon" />
                    <SlTrash onClick={() => deleteItem(data)} className="icon" />
                </div>
            </div>
        </li >
    );
}

export default memo(Item);