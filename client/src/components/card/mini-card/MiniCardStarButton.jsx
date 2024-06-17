import { useContext } from "react"
import { Button } from "reactstrap"
import { CardContext } from "./MiniCard"
import { starCard, unStarCard } from "../../../managers/cardManager"

const MiniCardStarButton = ({ starred, onStarChanged }) =>
{
    const card = useContext(CardContext)

    const handleStarButtonPress = () =>
    {
        starCard(card.id).then(onStarChanged)
    }

    const handleUnstarButtonPress = () =>
    {
        unStarCard(card.id).then(onStarChanged)
    }

    return starred
        ? <Button onClick={handleStarButtonPress}><i className="fa fa-star-o" aria-hidden="true"></i></Button>
        : <Button onClick={handleUnstarButtonPress}><i className="fa fa-star" aria-hidden="true"></i></Button>
}

export default MiniCardStarButton