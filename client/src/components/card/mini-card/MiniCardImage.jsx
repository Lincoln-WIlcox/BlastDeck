import { CardImg } from "reactstrap"
import "./MiniCard.css"

const MiniCardImage = ({ src }) =>
{
    return <div className="mini-card-image-container">
        <CardImg src={src} className="mini-card-image border-black border-2 shadow-sm" />
    </div>
}

export default MiniCardImage