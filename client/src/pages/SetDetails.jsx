import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSetById } from "../managers/setManager"
import CardList from "../components/card/CardList"

const SetDetails = () =>
{
    const { setId } = useParams()
    const [set, setSet] = useState({})

    useEffect(
        () =>
        {
            if(setId)
            {
                getSetById(setId).then(setSet)
            }
        }, [setId]
    )

    return <div>
        {
            set.userCardSets && <CardList cards={set.userCardSets.map(ucs => ucs.userCard.card)} />
        }
    </div>
}

export default SetDetails