import { useEffect, useState } from "react"
import CardList from "../components/card/CardList"
import { getCards } from "../managers/cardManager"

const AllPosts = () =>
{
    const [allCards, setAllCards] = useState([])

    useEffect(
        () =>
        {
            getCards().then(setAllCards);
        }, []
    )

    return <CardList cards={allCards} />
}

export default AllPosts