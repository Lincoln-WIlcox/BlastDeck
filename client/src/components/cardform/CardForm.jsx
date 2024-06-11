import { useState } from "react"
import { Button, Input, InputGroup, InputGroupText, Row } from "reactstrap"
import AnswerForm from "./AnswerForm"

const CardForm = () =>
{
    const [answers, setAnswers] = useState([])

    const handleAddAnswerPress = () =>
    {
        setAnswers([...answers, ""])
    }

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
            <Button onClick={handleAddAnswerPress}>Add Answer</Button>
        </Row>
        {
            answers.map((a, i) =>
                <Row key={i + "a"}>
                    <AnswerForm answer={a} />
                </Row>
            )
        }
    </div>
}

export default CardForm