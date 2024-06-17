import { Button } from "reactstrap"
import "./Practice.css"
import { answerCard } from "../../managers/answerManager"

const PracticeCardPassive = ({ card, onContinuePressed }) =>
{
    const handleAnswerChosen = (answerId) =>
    {
        //the endpoint will return if the answer is correct. The endpoint will also make a userAnswer
        answerCard(card.id, answerId).then(
            (correct) =>
            {
                if(correct)
                {
                    console.log("correct!")
                } else
                {
                    console.log("incorrect")
                }
            }
        )
    }

    return <div className="d-flex flex-column justify-content-between practice-container">
        <div className="d-flex flex-column gap-3">
            <img className="practice-image" src={card?.imageURL} />
        </div>
        <div className="d-flex flex-column">
            {
                card?.answers.map(a =>
                    <div>
                        <Button className="my-text" onClick={() => handleAnswerChosen(a.id)}>{a.word}</Button>
                    </div>)
            }
        </div>
    </div>
}

export default PracticeCardPassive