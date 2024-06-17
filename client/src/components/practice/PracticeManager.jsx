import { useState } from "react"
import PracticeCardAssociation from "./PracticeCardAssociation"
import { useNavigate } from "react-router-dom"

const PracticeManager = ({ cards }) =>
{
    const [currentCardIndex, setCurrentCardIndex] = useState(0)

    const navigate = useNavigate()

    const handleContinuePressed = () =>
    {
        if(currentCardIndex == cards.length - 1)
        {
            navigate("/practice")
        }
        setCurrentCardIndex(currentCardIndex + 1)
    }

    return <PracticeCardAssociation card={cards[currentCardIndex]} onContinuePressed={handleContinuePressed} />
}

export default PracticeManager