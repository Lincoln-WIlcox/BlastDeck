import { useEffect, useState } from "react"
import PracticeCardAssociation from "./PracticeCardAssociation"
import { useNavigate } from "react-router-dom"
import PracticeCardPassive from "./PracticeCardPassive";
import PracticeCardActive from "./PracticeCardActive";

//this emulates enums since javascript doesn't have them
const stages = Object.freeze({
    association: 1,
    passive: 2,
    passiveTwo: 3,
    active: 4
});

const PracticeManager = ({ cardIds, getCardIdsForStage }) =>
{
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [practiceCardIds, setPracticeCardIds] = useState([])
    const [cardsAnsweredCorrectly, setCardsAnsweredCorrectly] = useState([])
    const [stage, setStage] = useState(stages.association)

    const navigate = useNavigate()

    useEffect(
        () =>
        {
            setPracticeCardIds(shuffleArray(cardIds))
        }, [cardIds]
    )

    const shuffleArray = (array) =>
    {
        let arrayCopy = [...array]
        for(var i = arrayCopy.length - 1; i > 0; i--)
        {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arrayCopy[i];
            arrayCopy[i] = arrayCopy[j];
            arrayCopy[j] = temp;
        }
        return arrayCopy
    }

    const handleContinuePressedAssociation = () =>
    {
        if(currentCardIndex == cardIds.length - 1)
        {
            getCardIdsForStage(stages.passive).then(
                () =>
                {
                    setCurrentCardIndex(0)
                    setStage(stages.passive)
                }
            )

        } else
        {
            setCurrentCardIndex(currentCardIndex + 1)
        }
    }

    const handleContinuePressedPassive = () =>
    {
        if(currentCardIndex == practiceCardIds.length - 1)
        {
            if(cardsAnsweredCorrectly.length < cardIds.length)
            {
                setPracticeCardIds(shuffleArray(cardIds.filter(cId => !cardsAnsweredCorrectly.includes(cId))))
                setCurrentCardIndex(0)
            } else
            {
                setCardsAnsweredCorrectly([])
                setStage(stages.passiveTwo)
                setCurrentCardIndex(0)
            }

        } else
        {
            setCurrentCardIndex(currentCardIndex + 1)
        }
    }

    const handleContinuePressedPassiveTwo = () =>
    {
        if(currentCardIndex == practiceCardIds.length - 1)
        {
            if(cardsAnsweredCorrectly.length < cardIds.length)
            {
                setPracticeCardIds(shuffleArray(cardIds.filter(cId => !cardsAnsweredCorrectly.includes(cId))))
                setCurrentCardIndex(0)
            } else
            {
                setCardsAnsweredCorrectly([])
                setStage(stages.active)
                setCurrentCardIndex(0)
            }

        } else
        {
            setCurrentCardIndex(currentCardIndex + 1)
        }
    }

    const handleContinuePressedActive = () =>
    {
        if(currentCardIndex == practiceCardIds.length - 1)
        {
            if(cardsAnsweredCorrectly.length < cardIds.length)
            {
                setPracticeCardIds(shuffleArray(cardIds.filter(cId => !cardsAnsweredCorrectly.includes(cId))))
                setCurrentCardIndex(0)
            } else
            {
                navigate("/practice")
            }

        } else
        {
            setCurrentCardIndex(currentCardIndex + 1)
        }
    }

    const handleAnsweredCard = (answeredCorrectly, cardId) =>
    {
        if(answeredCorrectly)
        {
            setCardsAnsweredCorrectly([...cardsAnsweredCorrectly, cardId])
        } else
        {
            setCardsAnsweredCorrectly(cardsAnsweredCorrectly.filter(c => c.id != cardId))
        }
    }

    let returnComponent
    switch(stage)
    {
        case stages.association:
            returnComponent = <PracticeCardAssociation cardId={practiceCardIds[currentCardIndex]} onContinuePressed={handleContinuePressedAssociation} />
            break
        case stages.passive:
            returnComponent = <PracticeCardPassive passiveTwo={false} cardId={practiceCardIds[currentCardIndex]} onContinuePressed={handleContinuePressedPassive} answeredCard={handleAnsweredCard} otherCardIds={cardIds.filter(id => id != practiceCardIds[currentCardIndex])} />
            break
        case stages.passiveTwo:
            returnComponent = <PracticeCardPassive passiveTwo={true} cardId={practiceCardIds[currentCardIndex]} onContinuePressed={handleContinuePressedPassiveTwo} answeredCard={handleAnsweredCard} otherCardIds={cardIds.filter(id => id != practiceCardIds[currentCardIndex])} />
            break
        case stages.active:
            returnComponent = <PracticeCardActive cardId={practiceCardIds[currentCardIndex]} onContinuePressed={handleContinuePressedActive} answeredCard={handleAnsweredCard} />
            break
    }
    return returnComponent
}

export default PracticeManager