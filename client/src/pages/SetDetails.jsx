import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSetById } from "../managers/setManager"

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

    return <> set details </>
}

export default SetDetails