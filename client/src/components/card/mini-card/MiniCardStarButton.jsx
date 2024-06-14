import { Button } from "reactstrap"

const MiniCardStarButton = ({ starred, onStarButtonPress, onUnstarButtonPress }) =>
{
    return starred
        ? <Button onClick={onStarButtonPress}><i className="fa fa-star-o" aria-hidden="true"></i></Button>
        : <Button onClick={onUnstarButtonPress}><i className="fa fa-star" aria-hidden="true"></i></Button>
}

export default MiniCardStarButton