import { Row } from "reactstrap"

const MiniCardHeader = ({ children }) =>
{
    return <Row>
        <div className="d-flex gap-4">{children}</div>
    </Row>

}

export default MiniCardHeader