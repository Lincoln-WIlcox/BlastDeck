import { Button } from "reactstrap"
import "./Practice.css"

const PracticeCardAssociation = ({ card, onContinuePressed }) =>
{
    return <div className="d-flex flex-column justify-content-between practice-container">
        <div className="d-flex flex-column gap-3">
            <img className="practice-image" src={card?.imageURL} />
            <p className="my-text text-center">{card?.correctAnswer.word}</p>
            <p className="my-text text-center">{card?.englishWord}</p>
        </div>
        <div>
            <Button className="my-text" onClick={onContinuePressed}>Continue</Button>
        </div>
    </div>
}

export default PracticeCardAssociation