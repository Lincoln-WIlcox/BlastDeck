import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSetById } from "../managers/setManager"
import PickMiniCardList from "../components/card/PickMiniCardList"
import { getStarred } from "../managers/cardManager"

const AddCardToSet = () =>
{
    const [cards, setCards] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
    const { setId } = useParams()

    const fetchAndSetSet = () =>
    {
        getStarred().then(setCards)
    }

    useEffect(
        () =>
        {
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

    return <PickMiniCardList cards={cards} cardsUpdated={fetchAndSetSet} onCheckboxChanged={handleCheckboxChanged} />
}

export default AddCardToSet