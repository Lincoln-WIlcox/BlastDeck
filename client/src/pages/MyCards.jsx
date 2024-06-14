import { useContext, useEffect, useState } from "react"
import CardList from "../components/card/CardList"
import { getCards, getCardsByMe } from "../managers/cardManager"
import { Button } from "reactstrap"
import { CardContext } from "../components/card/mini-card/MiniCard"

import EditableMiniCard from "../components/card/mini-card/MyMiniCard"
import MyMiniCard from "../components/card/mini-card/MyMiniCard"
import MyCardsList from "../components/card/MyCardsList"

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

    return <MyCardsList cards={myCards} cardsUpdated={fetchAndSetMyCards} addStarButton>
        <MyMiniCard />
    </MyCardsList>
}

export default MyCards