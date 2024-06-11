import { useEffect, useState } from "react"
import CardForm from "../components/cardform/CardForm"
import { createCardByMe, getCardById } from "../managers/cardManager"
import { useNavigate, useParams } from "react-router-dom"

const EditCard = () =>
{
    const [existingCard, setExistingCard] = useState({})
    const { cardId } = useParams()
    const navigate = useNavigate()

    useEffect(
        () =>
        {
            getCardById(cardId).then(setExistingCard)
        }, [cardId]
    )

    const handleCardSubmitted = (card) =>
    {
        createCardByMe(card).then(
            () =>
            {
                navigate("/card")
            }
        )
    }

    return <CardForm onCardSubmitted={handleCardSubmitted} existingCard={existingCard} />
}

export default EditCard