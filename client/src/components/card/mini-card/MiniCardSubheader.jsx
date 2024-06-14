import { Row } from "reactstrap"

const MiniCardSubheader = ({ children }) =>
{
    return <Row>
        <div className="d-flex gap-3">
            {children}
        </div>
    </Row>
}

export default MiniCardSubheader