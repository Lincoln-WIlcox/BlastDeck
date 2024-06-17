import { useEffect, useState } from "react"
import PracticeManager from "../components/practice/PracticeManager"
import { getStarred } from "../managers/cardManager"

const PracticeAll = () =>
{
    const [cards, setCards] = useState([])

    useEffect(
        () =>
        {
            getStarred().then(setCards)
        }, []
    )

    return <PracticeManager cards={cards} />
}

export default PracticeAll