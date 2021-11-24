import { useState, useCallback } from 'react';
import { Card } from './Card';
import update from 'immutability-helper';
const style = {
    width: 400,
};
export const Container = (props) => {
    const [cards, setCards] = useState(props.items);
    const [isFormShown, setIsFormShow] = useState(false);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex];
        setCards(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }));
    }, [cards]);

    const showForm = () => {
        setIsFormShow(true);
        props.setShouldRefreshTaskList(true);
    }

    const renderCard = (card, index) => {
        return (<Card key={card.id} index={index} id={card.id} text={card.title} moveCard={moveCard}/>);
    };
    return (
        <>
            <div>
                <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
                {isFormShown && <form><input type={"text"} placeholder={"Type in title..."} /><textarea placeholder={"Type in description..."}></textarea></form>}
                {!isFormShown && <button onClick={showForm}>+ Add Task</button>}
            </div>
        </>
    );
};

// style={{height: "200px", "overflow": "auto", display: "flex" }}