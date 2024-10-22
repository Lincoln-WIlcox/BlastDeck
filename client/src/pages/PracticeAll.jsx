import { useEffect, useState } from "react"
import PracticeManager from "../components/practice/PracticeManager"
import { getCardIdsToPractice } from "../managers/cardManager"

const PracticeAll = () =>
{
    const [cardIds, setCardIds] = useState([])

    const getCardIdsForStage = async (stage) =>
    {
        return getCardIdsToPractice(stage).then(setCardIds)
    }

    useEffect(
        () =>
        {
            getCardIdsForStage(0)
        }, []
    )

    return <PracticeManager cardIds={cardIds} getCardIdsForStage={getCardIdsForStage} />
}

export default PracticeAll