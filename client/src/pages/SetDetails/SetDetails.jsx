import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSetById, removeCardFromSet } from "../../managers/setManager"
import CardList from "../../components/card/CardList"
import "./SetDetails.css"
import RemoveCardFromSetButton from "../../components/set/RemoveCardFromSetButton"
import { Row } from "reactstrap"

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

    return <div className="d-flex flex-column flex-grow-1">
        <p className="my-text set-header">{set.setName}</p>
        {
            set.userCardSets &&
            <CardList cards={set.userCardSets.map(ucs => ucs.userCard.card)} cardsUpdated={fetchAndSetSet} >
                <RemoveCardFromSetButton onRemoveFromSetPressed={handleRemoveFromSetPressed} />
            </CardList>
        }
    </div>
}

export default SetDetails