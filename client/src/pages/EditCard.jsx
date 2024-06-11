import { useEffect, useState } from "react"
import CardForm from "../components/cardform/CardForm"
import { createCardByMe } from "../managers/cardManager"
import { useNavigate, useParams } from "react-router-dom"

const EditCard = () =>
{
    const [existingCard, setExistingCard] = useState({})
    const { cardId } = useParams()
    const navigate = useNavigate()

    useEffect(
        () =>
        {
            
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

    return <CardForm onCardSubmitted={handleCardSubmitted} />
}

export default EditCard