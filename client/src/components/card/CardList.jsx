import { Row } from "reactstrap"
import MiniCard from "./mini-card/MiniCard"

const CardList = ({ addStarButton, cards, cardsUpdated, children }) =>
{
    return (
        <Row className="d-flex gap-3 mt-5">
            {
                cards.map(c =>
                    <MiniCard key={c.id + "c"} card={c} cardsUpdated={cardsUpdated} addStarButton={addStarButton}>
                        {
                            children && children
                        }
                    </MiniCard>)
            }
        </Row>
    )
}

export default CardList