import { useEffect, useState } from "react"
import SetList from "../components/set/SetList"
import { getSets } from "../managers/setManager"

const AllSets = () =>
{
    const [allSets, setAllSets] = useState([])

    useEffect(
        () =>
        {
            getSets().then(setAllSets)
        }, []
    )

    return <SetList />
}

export default AllSets