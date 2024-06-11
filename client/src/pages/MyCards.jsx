import { useEffect, useState } from "react"
import CardList from "../components/card/CardList"
import { getCards } from "../managers/cardManager"

const MyCards = () =>
{
    const [myCards, setMyCards] = useState([])

    const fetchAndSetMyCards = () =>
    {
        getCards().then(setMyCards);
    }

    useEffect(
        () =>
        {
            fetchAndSetMyCards()
        }, []
    )

    return <CardList cards={myCards} cardsUpdated={fetchAndSetMyCards} />
}

export default MyCards