import { Col } from "reactstrap"

const MiniCardSidebar = ({ children }) =>
{
    return <Col xs={4} className="d-flex align-items-center gap-3">{children}</Col>
}

export default MiniCardSidebar