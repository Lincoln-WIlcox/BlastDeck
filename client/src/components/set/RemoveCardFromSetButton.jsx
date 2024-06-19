import { useContext } from "react"
import { CardContext } from "../card/mini-card/MiniCard"
import { Button } from "reactstrap"

const RemoveCardFromSetButton = ({ onRemoveFromSetPressed }) =>
{
    const cardContext = useContext(CardContext)

    return <div className="d-flex">
        <Button color="danger" className="my-text text-nowrap" onClick={() => onRemoveFromSetPressed(cardContext.id)}>Remove From Set</Button>
    </div>

}

export default RemoveCardFromSetButton