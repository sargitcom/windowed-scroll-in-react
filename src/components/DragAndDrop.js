import ListItem from "./ListItem";
import {useState} from 'react';
import {useDrop} from "react-dnd";

const DragAndDrop = (props) => {
    const [{isOver}, drop] = useDrop(() => (
        {
            accept: 'taskItem',
            drop : (item) => {
                props.addTask(item);
            }
        }
    ));

    return (
        <div ref={drop} className={"drag-and-drop"}>
            {props.tasks.map(item => <ListItem key={item.id} title={item.title} />)}
        </div>
    )
}

export default DragAndDrop;