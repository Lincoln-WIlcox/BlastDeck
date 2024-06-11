import CardForm from "../components/cardform/CardForm"
import { createCardByMe } from "../managers/cardManager"
import { useNavigate } from "react-router-dom"

const EditCard = () =>
{
    const navigate = useNavigate()
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