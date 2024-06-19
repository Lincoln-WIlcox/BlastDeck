import { Button, Card, Input, InputGroup } from "reactstrap"
import "./Practice.css"
import { answerActive, answerCard } from "../../managers/answerManager"
import { useEffect, useState } from "react"
import { getCardWithoutCorrectAnswer } from "../../managers/cardManager"

const PracticeCardActive = ({ cardId, onContinuePressed }) =>
{
    const [answeredCorrectly, setAnsweredCorrectly] = useState()
    const [card, setCard] = useState({})
    const [typedAnswer, setTypedAnswer] = useState("")

    const handleAnswerSubmitted = () =>
    {
        answerActive(cardId, typedAnswer).then(setAnsweredCorrectly)
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
                <p className="my-text text-center">you answered wrong... bruh...</p>
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
                        <Button className="my-text bg-battleship-gray" onClick={onContinuePressed}>Continue</Button>
                    </div>
                }
            </div>
        </div>
    </Card>
}

export default PracticeCardActive