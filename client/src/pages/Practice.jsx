import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, CardBody, CardTitle } from "reactstrap"
import { UserContext } from "../App"
import { getSetsByUser } from "../managers/setManager"
import PracticeSetList from "../components/set/PracticeSetList"

const Practice = () =>
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
        <Card className="bg-black-olive">
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle className="mb-5">
                    <Link to="/practice/all">
                        <Button className="my-text bg-battleship-gray">Practice All</Button>
                    </Link>
                </CardTitle>

                <PracticeSetList sets={sets} />
            </CardBody>
        </Card>
    </div>
}

export default Practice