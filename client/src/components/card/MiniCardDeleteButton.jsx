import { useContext } from "react"
import { CardContext } from "./MiniCard"
import { Button } from "reactstrap"
import { Link } from "react-router-dom"
import { deleteCard } from "../../managers/cardManager"

const MiniCardEditButton = ({ cardDeleted }) =>
{
    const cardContext = useContext(CardContext)

    const handleDeletePress = () =>
    {
        deleteCard(cardContext).then(cardDeleted)
    }

    return <div className="d-flex">
        <Button onClick={handleDeletePress}>Delete</Button>
    </div>
}

export default MiniCardEditButton