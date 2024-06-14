import { useEffect, useState } from "react"
import CardList from "../components/card/CardList"
import { getCards } from "../managers/cardManager"
import AllCardsList from "../components/card/AllCardList"

const AllCards = () =>
{
    const [allCards, setAllCards] = useState([])
    const [showCards, setShowCards] = useState([])
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

    useEffect(
        () =>
        {
            if(searchQuery)
            {
                setShowCards(allCards.filter(c => c.englishWord.toLowerCase().includes(searchQuery.toLowerCase())))
            } else
            {
                setShowCards(allCards)
            }

        }, [searchQuery, allCards]
    )

    return <>
        <input type="search" placeholder="filter by english word" className="text-black rounded my-shadow-light p-1" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
        <AllCardsList cards={showCards} cardsUpdated={fetchAndSetAllCards} />
    </>
}

export default AllCards