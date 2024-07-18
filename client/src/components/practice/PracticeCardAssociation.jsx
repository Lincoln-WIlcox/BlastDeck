import { Button, Card } from "reactstrap"
import "./Practice.css"
import { useEffect, useState } from "react"
import { getCardById } from "../../managers/cardManager"

const PracticeCardAssociation = ({ cardId, onContinuePressed }) =>
{
    const [card, setCard] = useState({})

    useEffect(
        () =>
        {
            if(cardId)
            {
                getCardById(cardId).then(setCard)
            }
        }, [cardId]
    )

    return <Card className="d-flex flex-column justify-content-between practice-container bg-black-olive">
        <div className="d-flex flex-column gap-3">
            <img className="practice-image" src={card?.imageURL} />
            <p className="my-text text-center">{card.correctAnswer}</p>
            <p className="my-text text-center">{card?.englishWord}</p>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-end h-50">
            <div className="h-25">
                <Button className="my-text bg-battleship-gray" onClick={onContinuePressed}>Continue</Button>
            </div>
        </div>
    </Card>
}

export default PracticeCardAssociation