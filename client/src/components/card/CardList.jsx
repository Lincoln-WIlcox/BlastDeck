import { Row } from "reactstrap"
import MiniCard from "./MiniCard"

const CardList = ({ cards }) =>
{
    return (
        <Row className="d-flex gap-3">
            {
                cards.map(c =>
                    <MiniCard key={c.id + "c"} card={c} />)
            }
        </Row>
    )
}

export default CardList