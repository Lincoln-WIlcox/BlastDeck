import PickMiniCard from "./mini-card/PickMiniCard"

const PickMiniCardList = ({ cards, cardsUpdated, onCheckboxChanged }) =>
{
    return (
        cards?.map(c =>
            <PickMiniCard key={c.id + "c"} card={c} onCardsChanged={cardsUpdated} onCheckboxChanged={onCheckboxChanged} />)
    )
}

export default PickMiniCardList