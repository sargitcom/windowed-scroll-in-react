import {useDrag} from "react-dnd";

const ListItem = (props) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: "taskItem",
        item: {
            day: 'SomeDay'
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    return (
        <div ref={drag} className={"list-item"} style={{border: isDragging ? '1px solid red' : 'none'}}>
            {props.title}
        </div>
    )
}

export default ListItem;