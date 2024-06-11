import { Button, Input, InputGroup } from "reactstrap"

const AnswerForm = ({ answer, answerChanged, onRemovePressed }) =>
{
    const handleAnswerChange = (e) =>
    {
        answerChanged(e.target.value)
    }

    return <div className="d-flex">
        <InputGroup>
            <Button onClick={onRemovePressed}>Remove</Button>
            <Input type="text" value={answer} onChange={handleAnswerChange} />
        </InputGroup>

    </div>
}

export default AnswerForm