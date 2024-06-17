import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "reactstrap"
import { UserContext } from "../App"
import { getSetsByUser } from "../managers/setManager"
import PracticeSetList from "../components/set/PracticeSetList"

const PracticePage = () =>
{
    const [sets, setSets] = useState([])
    const user = useContext(UserContext)

    useEffect(
        () =>
        {
            getSetsByUser().then(setSets)
        }, [user.id]
    )

    return <div className="d-flex flex-column gap-4">
        <Link to="/practice/all">
            <Button className="my-text">Practice All</Button>
        </Link>
        <PracticeSetList sets={sets} />
    </div>
}

export default PracticePage