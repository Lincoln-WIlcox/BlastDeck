import { useEffect, useState } from "react"
import SetList from "../components/set/SetList"
import { getSets, getSetsByUser } from "../managers/setManager"

const AllSets = () =>
{
    const [allSets, setAllSets] = useState([])

    useEffect(
        () =>
        {
            getSetsByUser().then(setAllSets)
        }, []
    )

    return <SetList sets={allSets} />
}

export default AllSets