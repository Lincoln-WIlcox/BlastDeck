import { useEffect, useState } from "react"
import PracticeManager from "../components/practice/PracticeManager"
import { getCardIdsToPractice } from "../managers/cardManager"

const PracticeAll = () =>
{
    const [cardIds, setCardIds] = useState([])

    useEffect(
        () =>
        {
            getCardIdsToPractice().then(setCardIds)
        }, []
    )

    return <PracticeManager cardIds={cardIds} />
}

export default PracticeAll