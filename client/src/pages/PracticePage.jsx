import { Link } from "react-router-dom"

import { Button } from "reactstrap"

const PracticePage = () =>
{
    return <div>
        <Link to="/practice/all">
            <Button className="my-text">Practice All</Button>
        </Link>
    </div>
}

export default PracticePage