import { Row } from "reactstrap"
import MiniCard from "./mini-card/MiniCard"
import MyMiniCard from "./mini-card/MyMiniCard"

const MyCardsList = ({ addStarButton, cards, cardsUpdated, children }) =>
{
    return (
        cards.map(c =>
            <MyMiniCard key={c.id + "c"} card={c} cardsUpdated={cardsUpdated} addStarButton={addStarButton}>
                {
                    children && children
                }
            </MyMiniCard>)
    )
}

export default MyCardsList