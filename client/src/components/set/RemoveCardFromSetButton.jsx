import { useContext } from "react"
import { CardContext } from "../card/MiniCard"
import { Button } from "reactstrap"

const RemoveCardFromSetButton = ({ onRemoveFromSetPressed }) =>
{
    const cardContext = useContext(CardContext)

    return <div className="d-flex">
        <Button className="my-text" onClick={() => onRemoveFromSetPressed(cardContext.id)}>Remove From Set</Button>
    </div>

}

export default RemoveCardFromSetButton