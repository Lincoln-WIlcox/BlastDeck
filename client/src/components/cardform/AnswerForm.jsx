import { Button, Input, InputGroup, Label } from "reactstrap"

const AnswerForm = ({ answer, answerChanged, onRemovePressed, isCorrectAnswer, onCorrectAnswerSelected }) =>
{
    const handleAnswerChange = (e) =>
    {
        answerChanged(e.target.value)
    }

    const handleCorrectAnswerSelect = () =>
    {
        onCorrectAnswerSelected()
    }

    return <div className="d-flex">
        <div className="d-flex gap-2 m-2 align-items-center">
            <Label className="my-text smaller-text text-nowrap">Mark Correct</Label>
            <Input
                type="radio"
                name="correct-answer"
                checked={isCorrectAnswer}
                onChange={handleCorrectAnswerSelect}
            />
        </div>

        <InputGroup>
            <Input type="text" value={answer} onChange={handleAnswerChange} />
            <Button color="danger" onClick={onRemovePressed} className="my-text smaller-text">Remove</Button>
        </InputGroup>

    </div>
}

export default AnswerForm