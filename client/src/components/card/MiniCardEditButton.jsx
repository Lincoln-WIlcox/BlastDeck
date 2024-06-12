import { useContext } from "react"
import { CardContext } from "./MiniCard"
import { Button } from "reactstrap"
import { Link } from "react-router-dom"

const MiniCardEditButton = () =>
{
    const cardContext = useContext(CardContext)

    return <div className="d-flex">
        <Link className="my-button" to={`/card/${cardContext.id}/edit`}>
            <Button>Edit</Button>
        </Link>
    </div>
}

export default MiniCardEditButton