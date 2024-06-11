import { Row } from "reactstrap"
import MiniCard from "./MiniCard"

const CardList = ({ cards, cardsUpdated, children }) =>
{
    return (
        <Row className="d-flex gap-3">
            {
                cards.map(c =>
                    <MiniCard key={c.id + "c"} card={c} cardsUpdated={cardsUpdated}>
                        {
                            children && children
                        }
                    </MiniCard>)
            }
        </Row>
    )
}

export default CardList