import { Row } from "reactstrap"
import MiniCard from "./MiniCard"

const CardList = ({ cards, cardsUpdated }) =>
{
    return (
        <Row className="d-flex gap-3">
            {
                cards.map(c =>
                    <MiniCard key={c.id + "c"} card={c} cardsUpdated={cardsUpdated} />)
            }
        </Row>
    )
}

export default CardList