import CardForm from "../components/cardform/CardForm"
import { UserContext } from "../App"
import { useContext } from "react"

const CreateCard = () =>
{
    const user = useContext(UserContext)

    const handleCardSubmitted = (card) =>
    {
        card.creatorId = user.id
    }

    return <CardForm onCardSubmitted={handleCardSubmitted} />
}

export default CreateCard