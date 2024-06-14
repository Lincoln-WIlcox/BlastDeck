import { Row } from "reactstrap"

const MiniCardContent = ({ children }) =>
{
    return <Row>
        <div className="d-flex gap-2">
            {children}
        </div>
    </Row>
}

export default MiniCardContent