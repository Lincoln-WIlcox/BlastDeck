import { useState } from "react"
import PracticeCardAssociation from "./PracticeCardAssociation"
import { useNavigate } from "react-router-dom"
import PracticeCardPassive from "./PracticeCardPassive";

//this emulates enums since javascript doesn't have them
const stages = Object.freeze({
    association: 1,
    passive: 2,
    active: 3
});

const PracticeManager = ({ cards }) =>
{
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [stage, setStage] = useState(stages.association)

    const navigate = useNavigate()

    const handleContinuePressedAssociation = () =>
    {
        if(currentCardIndex == cards.length - 1)
        {
            setStage(stages.passive)
            setCurrentCardIndex(0)
        } else
        {
            setCurrentCardIndex(currentCardIndex + 1)
        }
    }

    const handleContinuePressedPassive = () =>
    {
        if(currentCardIndex == cards.length - 1)
        {
            navigate("/practice")
        } else
        {
            setCurrentCardIndex(currentCardIndex + 1)
        }
    }

    let returnComponent
    switch(stage)
    {
        case stages.association:
            returnComponent = <PracticeCardAssociation card={cards[currentCardIndex]} onContinuePressed={handleContinuePressedAssociation} />
            break
        case stages.passive:
            returnComponent = <PracticeCardPassive card={cards[currentCardIndex]} onContinuePressed={handleContinuePressedPassive} />
            break
    }
    return returnComponent
}

export default PracticeManager