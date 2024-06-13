import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const SetDetails = () =>
{
    const {setId} = useParams()
    const [set, setSet] = useState({})

    useEffect(
        () =>
        {
            
        }, [setId]
    )

    return <> set details </>
}

export default SetDetails