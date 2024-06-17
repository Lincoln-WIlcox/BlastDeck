import { useState } from "react"
import PracticeCardStageOne from "./PracticeCard"

const PracticeManager = ({ cards }) =>
{
    const [currentCardIndex, setCurrentCardIndex] = useState(0)

    return <PracticeCardStageOne card={cards[currentCardIndex]} />
}

export default PracticeManager