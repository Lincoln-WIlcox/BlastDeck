import { Row } from "reactstrap"
import MiniCard from "./mini-card/MiniCard"
import MyMiniCard from "./mini-card/MyMiniCard"
import SetMiniCard from "./mini-card/SetMiniCard"

const SetCardList = ({ addStarButton, cards, cardsUpdated, onRemoveFromSetPressed }) =>
{
    return (
        cards.map(c =>
            <SetMiniCard key={c.id + "c"} card={c} cardsUpdated={cardsUpdated} addStarButton={addStarButton} onRemoveFromSetPressed={onRemoveFromSetPressed} />)
    )
}

export default SetCardList