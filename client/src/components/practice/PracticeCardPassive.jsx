import { Button } from "reactstrap"
import "./Practice.css"

const PracticeCardPassive = ({ card, onContinuePressed }) =>
{
    const handleAnswerChosen = (correct) =>
    {
        debugger
    }

    return <div className="d-flex flex-column justify-content-between practice-container">
        <div className="d-flex flex-column gap-3">
            <img className="practice-image" src={card?.imageURL} />
        </div>
        <div className="d-flex flex-column">
            {
                card?.answers.map(a =>
                    <div>
                        <Button className="my-text" onClick={() => handleAnswerChosen(a.id == card.correctAnswerId)}>{a.word}</Button>
                    </div>)
            }
        </div>
    </div>
}

export default PracticeCardPassive