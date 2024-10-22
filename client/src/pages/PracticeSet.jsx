import { useEffect, useState } from "react"
import PracticeManager from "../components/practice/PracticeManager"
import { getCardIdsToPractice } from "../managers/cardManager"
import { useParams } from "react-router-dom"

const PracticeSet = () =>
{
    const [cardIds, setCardIds] = useState([])

    const { setId } = useParams()

    const getCardIdsForStage = async (stage) =>
    {
        return getCardIdsToPractice(stage, setId).then
            (
                (newCards) =>
                {
                    setCardIds(newCards)
                    getCardIdsToPractice(-1).then
                        (
                            (newCards) =>
                            {
                                setAllCards(newCards)
                            }
                        )
                }
            )
    }

    useEffect(
        () =>
        {
            getCardIdsForStage(0)
        }, [setId]
    )

    return <PracticeManager cardIds={cardIds} getCardIdsForStage={getCardIdsForStage} allCards={allCards} />
}

export default PracticeSet