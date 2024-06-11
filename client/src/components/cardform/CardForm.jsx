import { useEffect, useState } from "react"
import { Button, Input, InputGroup, InputGroupText, Row } from "reactstrap"
import AnswerForm from "./AnswerForm"
import "./CardForm.css"

const CardForm = ({ onCardSubmitted, existingCard }) =>
{
    const [answers, setAnswers] = useState([])
    const [imageURL, setImageURL] = useState("")
    const [englishWord, setEnglishWord] = useState("")
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1)
    const [imageIsValid, setImageIsValid] = useState(false)

    useEffect(
        () =>
        {
            const img = new Image();
            img.src = imageURL;
            img.onload = () => setImageIsValid(true);
            img.onerror = () => setImageIsValid(false);
        }, [imageURL]
    )

    useEffect(
        () =>
        {
            if(existingCard)
            {
                setAnswers(existingCard.answers ? existingCard.answers.map(a => a.word) : [])
                existingCard.answers?.forEach(
                    (a, i) =>
                    {
                        if(a.id == existingCard.correctAnswerId)
                        {
                            setCorrectAnswerIndex(i)
                        }
                    }
                );
                setImageURL(existingCard.imageURL ? existingCard.imageURL : "")
                setEnglishWord(existingCard.englishWord ? existingCard.englishWord : "")
            }


        }, [existingCard]
    )

    const handleAddAnswerPress = () =>
    {
        setAnswers([...answers, ""])
    }

    const handleAnswerChange = (newAnswer, index) =>
    {
        const answersCopy = [...answers]
        answersCopy[index] = newAnswer
        setAnswers(answersCopy)
    }

    const handleAnswerRemove = (index) =>
    {
        if(index == correctAnswerIndex)
        {
            setCorrectAnswerIndex(-1)
        }

        setAnswers(answers.filter((a, i) => i != index))
    }

    const formIsValid = () =>
    {
        return answers.length > 0 && correctAnswerIndex != -1 && imageURL && englishWord && imageIsValid
    }

    const handleSubmitPressed = () =>
    {
        const card =
        {
            imageURL,
            englishWord,
            answers,
            correctAnswerIndex
        }

        onCardSubmitted(card)
    }

    return <div className="d-flex flex-column gap-3 align-items-center">
        <div className="d-flex flex-column gap-3 m-2 align-items-center">
            {
                imageIsValid
                && <img src={imageURL} className="limit-image" />
            }
            <Row className="d-flex flex-column gap-3">
                <InputGroup>
                    <InputGroupText>
                        Image
                    </InputGroupText>
                    <Input placeholder="URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
                </InputGroup>
                <InputGroup>
                    <InputGroupText>
                        English Word
                    </InputGroupText>
                    <Input placeholder="URL" value={englishWord} onChange={(e) => setEnglishWord(e.target.value)} />
                </InputGroup>
            </Row>
            <Row className="mx-5">
                <Button onClick={handleAddAnswerPress}>Add Answer</Button>
            </Row>
        </div>
        <div className="d-flex flex-column gap-3">
            {
                answers.map((a, i) =>
                    <Row key={i + "a"}>
                        <AnswerForm
                            answer={a}
                            answerChanged={(newAnswer) => handleAnswerChange(newAnswer, i)}
                            onRemovePressed={() => handleAnswerRemove(i)}
                            isCorrectAnswer={correctAnswerIndex == i}
                            onCorrectAnswerSelected={() => setCorrectAnswerIndex(i)} />
                    </Row>
                )
            }
        </div>
        <Button className="w-50" disabled={!formIsValid()} onClick={handleSubmitPressed}>Submit</Button>


    </div>
}

export default CardForm