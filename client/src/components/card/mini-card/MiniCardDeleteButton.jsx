import { useContext } from "react"
import { CardContext } from "./MiniCard"
import { Button } from "reactstrap"
import { Link } from "react-router-dom"
import { deleteCard } from "../../../managers/cardManager"

const MiniCardDeleteButton = ({ onCardDeleted }) =>
{
    const cardContext = useContext(CardContext)

    const handleDeletePress = () =>
    {
        deleteCard(cardContext.id).then(onCardDeleted)
    }

    return <div className="d-flex">
        <Button color="danger" onClick={handleDeletePress}>Delete</Button>
    </div>
}

export default MiniCardDeleteButton