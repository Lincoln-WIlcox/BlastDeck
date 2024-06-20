import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addCardsToSet, getSetById } from "../managers/setManager"
import PickMiniCardList from "../components/card/PickMiniCardList"
import { getStarred } from "../managers/cardManager"
import { Button, Card } from "reactstrap"

const AddCardToSet = () =>
{
    const [set, setSet] = useState({})
    const [cards, setCards] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
    const { setId } = useParams()

    const navigate = useNavigate()

    const fetchAndSetStarredCards = () =>
    {
        getStarred(setId).then(setCards)
    }

    const fetchAndSetSet = () =>
    {
        getSetById(setId).then(setSet)
    }

    useEffect(
        () =>
        {
            fetchAndSetStarredCards()
            fetchAndSetSet()
        }, [setId]
    )

    const handleCheckboxChanged = (checked, cardId) =>
    {
        if(checked)
        {
            setSelectedCards([...selectedCards, cardId])
        } else
        {
            setSelectedCards(selectedCards.map(c => c != cardId))
        }
    }

    const handleAddCardsButtonPressed = () =>
    {
        addCardsToSet(selectedCards, setId).then(
            () =>
            {
                navigate(`/set/${setId}`)
            }
        )
    }

    return <Card className="bg-sage">
        <div>
            <Button color="success" className="my-text" onClick={handleAddCardsButtonPressed}>Add Cards To {set.setName}</Button>
        </div>
        <PickMiniCardList cards={cards} cardsUpdated={fetchAndSetStarredCards} onCheckboxChanged={handleCheckboxChanged} />
    </Card>

}

export default AddCardToSet