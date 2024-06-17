import { useState } from "react"
import PracticeCardAssociation from "./PracticeCard"

const PracticeManager = ({ cards }) =>
{
    const [currentCardIndex, setCurrentCardIndex] = useState(0)

    return <PracticeCardAssociation card={cards[currentCardIndex]} />
}

export default PracticeManager