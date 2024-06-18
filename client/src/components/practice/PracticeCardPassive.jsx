import { Button, Input, InputGroup, Label } from "reactstrap"
import "./Practice.css"
import { answerCard } from "../../managers/answerManager"
import { useEffect, useState } from "react"
import { getCardWithoutCorrectAnswer } from "../../managers/cardManager"

const PracticeCardPassive = ({ cardId, onContinuePressed }) =>
{
    const [answeredCorrectly, setAnsweredCorrectly] = useState()
    const [card, setCard] = useState({})
    const [selectedAnswer, setSelectedAnswer] = useState(0)

    const handleAnswerChosen = () =>
    {
        //the endpoint will return if the answer is correct. The endpoint will also make a userAnswer
        answerCard(cardId, selectedAnswer).then(setAnsweredCorrectly)
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
            content = <div className="d-flex flex-shrink-1 flex-column align-items-center gap-3">
                <InputGroup className="d-flex flex-column w-25">
                    {
                        card.answers?.map(a =>
                        {
                            const id = "a" + a.id
                            return <div className="d-flex justify-content-end flex-shrink-1 gap-3" key={"a" + a.id}>
                                <Label className="my-text" htmlFor={id}>{a.word}</Label>
                                <Input id={id} name="answer" type="radio" onClick={() => setSelectedAnswer(a.id)} />
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

    return <div className="d-flex flex-column justify-content-between practice-container">
        <div>
            <img className="practice-image" src={card.imageURL} />
        </div>
        <div className="d-flex flex-column">
            {
                content
            }
            {
                selectedAnswer != 0 && answeredCorrectly == undefined &&
                <div>
                    <Button className="my-text" onClick={handleAnswerChosen}>Submit</Button>
                </div>
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

export default PracticeCardPassive