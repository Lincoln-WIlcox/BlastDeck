import CardForm from "../components/cardform/CardForm"
import { createCardByMe } from "../managers/cardManager"
import { useNavigate } from "react-router-dom"

const CreateCard = () =>
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

export default CreateCard