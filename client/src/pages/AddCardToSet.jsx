import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addCardsToSet, getSetById } from "../managers/setManager"
import PickMiniCardList from "../components/card/PickMiniCardList"
import { getStarred } from "../managers/cardManager"
import { Button } from "reactstrap"

const AddCardToSet = () =>
{
    const [set, setSet] = useState({})
    const [cards, setCards] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
    const { setId } = useParams()

    const navigate = useNavigate()

    const fetchAndSetStarredCards = () =>
    {
        getStarred().then(setCards)
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

    return <div>
        <Button onClick={handleAddCardsButtonPressed}>Add Cards To {set.setName}</Button>
        <PickMiniCardList cards={cards} cardsUpdated={fetchAndSetStarredCards} onCheckboxChanged={handleCheckboxChanged} />
    </div>

}

export default AddCardToSet