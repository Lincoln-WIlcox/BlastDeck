import { Button, Card, Input, InputGroup, Label } from "reactstrap"
import "./Practice.css"
import { answerCard } from "../../managers/answerManager"
import { useEffect, useState } from "react"
import { getCardWithoutCorrectAnswer } from "../../managers/cardManager"
import { playSoundFromURL } from "../../utils/AudioUtils"

const PracticeCardPassive = ({ passiveTwo, cardId, onContinuePressed, answeredCard, otherCardIds }) =>
{
    const [answeredCorrectly, setAnsweredCorrectly] = useState()
    const [card, setCard] = useState({})
    const [selectedAnswer, setSelectedAnswer] = useState(-1)
    const [correctAnswer, setCorrectAnswer] = useState("")

    const handleAnswerChosen = () =>
    {
        //the endpoint will return if the answer is correct. The endpoint will also make a userAnswer
        answerCard(cardId, card.answers[selectedAnswer]).then(
            (answer) =>
            {
                setAnsweredCorrectly(answer.answeredCorrectly)
                setCorrectAnswer(answer.correctAnswer)
                answeredCard(answer.answeredCorrectly, card.id)
                playSoundFromURL(answer.audioURL)
            }
        )
    }

    const fetchAndSetCard = () =>
    {
        getCardWithoutCorrectAnswer(cardId, otherCardIds, passiveTwo).then(setCard)
    }

    useEffect(
        () =>
        {
            setAnsweredCorrectly(undefined)
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
            content = <div className="d-flex flex-shrink-1 flex-column align-items-center gap-3">
                <InputGroup className="d-flex flex-column w-25">
                    {
                        card.answers?.map((a, i) =>
                        {
                            const id = "a" + i
                            return <div className="d-flex justify-content-end flex-shrink-1 gap-3" key={"a" + i}>
                                <Label className="my-text" htmlFor={id}>{a}</Label>
                                <Input id={id} name="answer" type="radio" onClick={() => setSelectedAnswer(i)} />
                            </div>
                        }
                        )
                    }
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
                    selectedAnswer != -1 && answeredCorrectly == undefined &&
                    <Button className="my-text bg-battleship-gray" onClick={handleAnswerChosen}>Submit</Button>
                }
                {
                    answeredCorrectly != undefined &&
                    <div className="d-flex flex-column align-items-center">
                        <p className="my-text">{correctAnswer}</p>
                        <Button className="my-text" onClick={handleContinuePressed}>Continue</Button>
                    </div>
                }
            </div>
        </div>
    </Card>
}

export default PracticeCardPassive