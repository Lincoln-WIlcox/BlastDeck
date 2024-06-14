import { useParams } from "react-router-dom"

const AddCardToSet = () =>
{
    const { setId } = useParams()

    return <>add card to set {setId}</>
}

export default AddCardToSet