import { useEffect, useState } from "react"
import AllCardsList from "../components/card/AllCardList"
import { getStarred } from "../managers/cardManager"

const ViewStarredCards = () =>
{
    const [cards, setCards] = useState([])

    const fetchAndSetCards = () =>
    {
        getStarred().then(setCards)
    }

    useEffect(
        () =>
        {
            fetchAndSetCards()
        }, []
    )

    return <AllCardsList cards={cards} onCardsChanged={fetchAndSetCards} />
}

export default ViewStarredCards