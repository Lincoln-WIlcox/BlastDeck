import { Row } from "reactstrap"
import MiniCard from "./mini-card/MiniCard"
import MyMiniCard from "./mini-card/MyMiniCard"
import AllMiniCard from "./mini-card/AllMiniCard"

const AllCardsList = ({ addStarButton, cards, cardsUpdated }) =>
{
    return (
        cards.map(c =>
            <AllMiniCard key={c.id + "c"} card={c} cardsUpdated={cardsUpdated} addStarButton={addStarButton} />)
    )
}

export default AllCardsList