import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSetById } from "../managers/setManager"
import PickMiniCardList from "../components/card/PickMiniCardList"

const AddCardToSet = () =>
{
    const [cards, setCards] = useState([])
    const { setId } = useParams()

    const fetchAndSetSet = () =>
    {
        getSetById(setId).then(setSet)
    }

    useEffect(
        () =>
        {
            fetchAndSetSet()
        }, [setId]
    )

    const handleCheckboxChanged = (e) =>
    {

    }

    return <PickMiniCardList cards={cards.userCardSets?.map(ucs => ucs.userCard.card)} cardsUpdated={fetchAndSetSet} onCheckboxChanged={handleCheckboxChanged} />
}

export default AddCardToSet