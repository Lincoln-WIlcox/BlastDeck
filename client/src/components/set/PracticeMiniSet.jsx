import { Link } from "react-router-dom"

const PracticeMiniSet = ({ set }) =>
{
    return <Link to={`/practice/${set.id}`}>
        <p className="my-text">Practice {set.setName}</p>
    </Link>
}

export default PracticeMiniSet