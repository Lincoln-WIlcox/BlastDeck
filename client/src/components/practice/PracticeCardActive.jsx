import { Button, Card, Input, InputGroup } from "reactstrap"
import "./Practice.css"
import { answerActive, answerCard } from "../../managers/answerManager"
import { useEffect, useState } from "react"
import { getCardWithoutCorrectAnswer } from "../../managers/cardManager"
import { playSoundFromURL } from "../../utils/AudioUtils"

const PracticeCardActive = ({ cardId, onContinuePressed, answeredCard }) =>
{
    const [answeredCorrectly, setAnsweredCorrectly] = useState()
    const [card, setCard] = useState({})
    const [typedAnswer, setTypedAnswer] = useState("")
    const [correctAnswer, setCorrectAnswer] = useState("")

    const handleAnswerSubmitted = () =>
    {
        answerActive(cardId, typedAnswer).then(
            (answer) =>
            {
                setAnsweredCorrectly(answer.answeredCorrectly)
                setCorrectAnswer(answer.correctAnswer)
                answeredCard(answer.answeredCorrectly, cardId)
                playSoundFromURL(answer.audioURL)
            }
        )
    }

    const fetchAndSetCard = () =>
    {
        getCardWithoutCorrectAnswer(cardId).then(setCard)
    }

    useEffect(
        () =>
        {
            setAnsweredCorrectly(undefined)
            setTypedAnswer("")
            fetchAndSetCard()
        }, [cardId]
    )

    const handleContinuePressed = () =>
    {
        onContinuePressed()
        setAnsweredCorrectly(undefined)
    }

    let content

    switch(answeredCorrectly)
    {
        case undefined:
            content = <div className="d-flex justify-content-center input-width">
                <InputGroup>
                    <Input className=" fs-5" type="text" onChange={(e) => setTypedAnswer(e.target.value)} value={typedAnswer} />
                    <Button className="my-text bg-battleship-gray" onClick={handleAnswerSubmitted}>Submit</Button>
                </InputGroup>
            </div>
            break
        case true:
            content = <div>
                <p className="my-text text-center">Correct!</p>
            </div>
            break
        case false:
            content = <div>
                <p className="my-text text-center">Incorrect.</p>
            </div>
            break
    }

    return <Card className="d-flex flex-column justify-content-between practice-container bg-black-olive">
        <div>
            <img className="practice-image" src={card.imageURL} />
        </div>
        <div className="d-flex flex-column align-items-center justify-content-end h-50">

            {
                content
            }
            <div className="h-25">
                {
                    answeredCorrectly != undefined &&
                    <div>
                        <p className="my-text">{correctAnswer}</p>
                        <Button className="my-text" onClick={handleContinuePressed}>Continue</Button>
                    </div>
                }
            </div>
        </div>
    </Card>
}

export default PracticeCardActive