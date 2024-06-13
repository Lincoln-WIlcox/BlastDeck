import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSetById } from "../../managers/setManager"
import CardList from "../../components/card/CardList"
import "./SetDetails.css"

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

    return <div>
        <p className="my-text set-header">{set.setName}</p>
        {
            set.userCardSets && <CardList cards={set.userCardSets.map(ucs => ucs.userCard.card)} cardsUpdated={fetchAndSetSet} />
        }
    </div>
}

export default SetDetails