import { useState } from "react"
import PracticeCard from "./PracticeCard"

const PracticeManager = ({ cards }) =>
{
    const [currentCardIndex, setCurrentCardIndex] = useState(0)

    return <PracticeCard card={cards[currentCardIndex]} />
}

export default PracticeManager