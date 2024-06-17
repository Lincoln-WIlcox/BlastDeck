import PickMiniCard from "./mini-card/PickMiniCard"

const PickMiniCardList = ({ addStarButton, cards, cardsUpdated, onCheckboxChanged }) =>
{
    return (
        cards?.map(c =>
            <PickMiniCard key={c.id + "c"} card={c} cardsUpdated={cardsUpdated} addStarButton={addStarButton} onCheckboxChanged={onCheckboxChanged} />)
    )
}

export default PickMiniCardList