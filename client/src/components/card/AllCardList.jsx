import { Row } from "reactstrap"
import MiniCard from "./mini-card/MiniCard"
import MyMiniCard from "./mini-card/MyMiniCard"
import AllMiniCard from "./mini-card/AllMiniCard"

const AllCardsList = ({ cards, onCardsChanged }) =>
{
    return (
        cards.map(c =>
            <AllMiniCard key={c.id + "c"} card={c} onCardChanged={onCardsChanged} />)
    )
}

export default AllCardsList