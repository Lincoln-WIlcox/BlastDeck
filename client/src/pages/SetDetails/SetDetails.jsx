import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getSetById, removeCardFromSet } from "../../managers/setManager"
import CardList from "../../components/card/CardList"
import "./SetDetails.css"
import RemoveCardFromSetButton from "../../components/set/RemoveCardFromSetButton"
import { Button, Card, Row } from "reactstrap"
import SetCardList from "../../components/card/SetCardsList"

const SetDetails = () =>
{
    const { setId } = useParams()
    const [set, setSet] = useState({})

    const fetchAndSetSet = () =>
    {
        getSetById(setId).then(setSet)
    }

    useEffect(
        () =>
        {
            if(setId)
            {
                fetchAndSetSet()
            }
        }, [setId]
    )

    const handleRemoveFromSetPressed = (cardId) =>
    {
        removeCardFromSet(setId, cardId).then(fetchAndSetSet)
    }

    return <Card className="d-flex flex-column flex-grow-1 align-items-center bg-battleship-gray shadow-sm">
        <Card className="bg-black-olive shadow-sm">
            <p className="my-text set-header">{set.setName}</p>
            <Link to={`/set/${setId}/add-card`}><Button className="my-text bg-battleship-gray shadow-sm">Add Card</Button></Link>
        </Card>

        {
            set.userCardSets &&
            <SetCardList cards={set.userCardSets.map(ucs => ucs.userCard.card)} cardsUpdated={fetchAndSetSet} onRemoveFromSetPressed={handleRemoveFromSetPressed} />
        }
    </Card>
}

export default SetDetails