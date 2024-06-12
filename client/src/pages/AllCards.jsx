import { useEffect, useState } from "react"
import CardList from "../components/card/CardList"
import { getCards } from "../managers/cardManager"

const AllCards = () =>
{
    const [allCards, setAllCards] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

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

    return <>
        <input type="search" placeholder="filter by english word" className="text-black rounded my-shadow-light p-1" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
        <CardList cards={allCards} cardsUpdated={fetchAndSetAllCards} />
    </>
}

export default AllCards