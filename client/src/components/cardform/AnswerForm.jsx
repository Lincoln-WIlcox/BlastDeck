import { Input } from "reactstrap"

const AnswerForm = ({ answer, answerChanged }) =>
{
    const handleAnswerChange = (e) =>
    {
        answerChanged(e.target.value)
    }

    return <div>
        <Input type="text" value={answer} onChange={handleAnswerChange}/>
    </div>
}

export default AnswerForm