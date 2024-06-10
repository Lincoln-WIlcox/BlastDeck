import { useEffect, useState } from "react"
import CardList from "../components/card/CardList"
import { getCards } from "../managers/cardManager"

const AllPosts = () =>
{
    const [allCards, setAllCards] = useState([])

    const fetchAndSetAllCards = () =>
    {
        getCards().then(setAllCards);
    }

    useEffect(
        () =>
        {
            fetchAndSetAllCards()
        }, []
    )

    return <CardList cards={allCards} cardsUpdated={fetchAndSetAllCards} />
}

export default AllPosts