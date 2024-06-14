import { CardImg } from "reactstrap"

const MiniCardImage = ({ src }) =>
{
    return <div className="mini-card-container">
        <CardImg src={src} className="mini-card border-black border-2 shadow-sm" />
    </div>
}

export default MiniCardImage