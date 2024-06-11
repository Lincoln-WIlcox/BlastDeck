import { useContext, useEffect, useState } from "react"
import CardList from "../components/card/CardList"
import { getCards, getCardsByMe } from "../managers/cardManager"
import { Button } from "reactstrap"
import { CardContext } from "../components/card/MiniCard"
import CardContextProvider from "../components/card/MiniCardEditButton"
import MiniCardEditButton from "../components/card/MiniCardEditButton"

const MyCards = () =>
{
    const [myCards, setMyCards] = useState([])

    const fetchAndSetMyCards = () =>
    {
        getCardsByMe().then(setMyCards);    
    }

    useEffect(
        () =>
        {
            fetchAndSetMyCards()
        }, []
    )

    const handleEdit = (card) =>
    {
        console.log(card.id)
    }

    return <CardList cards={myCards} cardsUpdated={fetchAndSetMyCards}>
        <MiniCardEditButton />
    </CardList>
}

export default MyCards