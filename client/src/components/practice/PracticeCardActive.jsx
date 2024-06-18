import { Button, Input } from "reactstrap"
import "./Practice.css"
import { answerCard } from "../../managers/answerManager"
import { useEffect, useState } from "react"
import { getCardWithoutCorrectAnswer } from "../../managers/cardManager"

const PracticeCardActive = ({ cardId, onContinuePressed }) =>
{
    const [answeredCorrectly, setAnsweredCorrectly] = useState()
    const [card, setCard] = useState({})
    const [typedAnswer, setTypedAnswer] = useState("")

    const handleAnswerSubmitted = () =>
    {
        //the endpoint will return if the answer is correct. The endpoint will also make a userAnswer
        //answerCard(cardId, answerId).then(setAnsweredCorrectly)
    }

    const fetchAndSetCard = () =>
    {
        getCardWithoutCorrectAnswer(cardId).then(setCard)
    }

    useEffect(
        () =>
        {
            setAnsweredCorrectly(undefined)
            fetchAndSetCard()
        }, [cardId]
    )

    let content

    switch(answeredCorrectly)
    {
        case undefined:
            content = <div>
                <Input type="text" onChange={(e) => setTypedAnswer(e.target.value)} value={typedAnswer} />
                <Button onClick={handleAnswerSubmitted}>Submit</Button>
            </div>
            break
        case true:
            content = <div>
                <p className="my-text text-center">Correct!</p>
            </div>
            break
        case false:
            content = <div>
                <p className="my-text text-center">you answered wrong... bruh...</p>
            </div>
            break
    }

    return <div className="d-flex flex-column justify-content-between practice-container">
        <div>
            <img className="practice-image" src={card.imageURL} />
        </div>
        <div className="d-flex flex-column">
            {
                content
            }
            {
                answeredCorrectly != undefined &&
                <div>
                    <Button className="my-text" onClick={onContinuePressed}>Continue</Button>
                </div>
            }
        </div>
    </div>
}

export default PracticeCardActive