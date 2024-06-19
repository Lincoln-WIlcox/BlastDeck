import { Link } from "react-router-dom"


const MiniSet = ({ set }) =>
{
    return <Link to={`/set/${set.id}`}>
        <p className="my-text text-decoration-underline">{set.setName}</p>
    </Link>
}

export default MiniSet