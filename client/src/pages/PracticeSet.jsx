import { useEffect, useState } from "react"
import PracticeManager from "../components/practice/PracticeManager"
import { getCardIdsToPractice } from "../managers/cardManager"
import { useParams } from "react-router-dom"

const PracticeAll = () =>
{
    const [cardIds, setCardIds] = useState([])

    const { setId } = useParams()

    useEffect(
        () =>
        {
            getCardIdsToPractice(setId).then(setCardIds)
        }, [setId]
    )

    return <PracticeManager cardIds={cardIds} />
}

export default PracticeAll