import { useContext, useEffect, useState } from "react"
import CardList from "../components/card/CardList"
import { getCards, getCardsByMe } from "../managers/cardManager"
import { Button } from "reactstrap"
import { CardContext } from "../components/card/MiniCard"
import CardContextProvider from "../components/card/MiniCardEditButton"
import MiniCardEditButton from "../components/card/MiniCardEditButton"
import MiniCardDeleteButton from "../components/card/MiniCardDeleteButton"

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

    return <CardList cards={myCards} cardsUpdated={fetchAndSetMyCards}>
        <div className="d-flex gap-2">
            <MiniCardEditButton />
            <MiniCardDeleteButton cardDeleted={fetchAndSetMyCards} />
        </div>
    </CardList>
}

export default MyCards