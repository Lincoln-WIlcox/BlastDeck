import { useParams } from "react-router-dom"

const AddCardToSet = () =>
{
    const { cardId } = useParams()

    return <>add card to set {cardId}</>
}

export default AddCardToSet