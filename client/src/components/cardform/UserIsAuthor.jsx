import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"
import { useParams } from "react-router-dom"
import { getCardById } from "../../managers/cardManager"

const UserIsCreatorOfCard = ({ children }) =>
{
    const user = useContext(UserContext)
    const { cardId } = useParams()
    const [card, setCard] = useState({})

    useEffect(
        () =>
        {
            getCardById(cardId).then(setCard)
        }, [cardId]
    )

    return (
        user.id == card.creatorId ? children : <>You are not the author of this post.</>
    )
}

export default UserIsCreatorOfCard