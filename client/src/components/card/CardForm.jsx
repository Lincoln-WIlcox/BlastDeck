import { Button, Input, InputGroup, InputGroupText, Row } from "reactstrap"

const CardForm = () =>
{
    return <div className="d-flex flex-column gap-3">
        <Row>
            <InputGroup>
                <InputGroupText>
                    Image
                </InputGroupText>
                <Input placeholder="URL" />
            </InputGroup>
        </Row>
        <Row className="mx-5">
            <Button>Add Answer</Button>
        </Row>
    </div>
}

export default CardForm