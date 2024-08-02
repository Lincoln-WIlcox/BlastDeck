import { useContext, useEffect, useState } from "react"
import { Button, Input, InputGroup, InputGroupText, Row } from "reactstrap"
import AnswerForm from "./AnswerForm"
import "./CardForm.css"
import { UserContext } from "../../App"

const CardForm = ({ onCardSubmitted, existingCard }) =>
{
    const [imageURL, setImageURL] = useState("")
    const [englishWord, setEnglishWord] = useState("")
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [imageIsValid, setImageIsValid] = useState(false)
    const [audioURL, setAudioURL] = useState("")

    const user = useContext(UserContext)

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
                setCorrectAnswer(existingCard.correctAnswer ? existingCard.correctAnswer : "")
                setImageURL(existingCard.imageURL ? existingCard.imageURL : "")
                setEnglishWord(existingCard.englishWord ? existingCard.englishWord : "")
                setAudioURL(existingCard.audioURL)
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
        return correctAnswer != "" && imageURL && englishWord && imageIsValid
    }

    const handleSubmitPressed = () =>
    {
        const card =
        {
            imageURL,
            englishWord,
            correctAnswer,
            audioURL
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
                    <Input placeholder="Word" value={englishWord} onChange={(e) => setEnglishWord(e.target.value)} />
                </InputGroup>
                <InputGroup>
                    <InputGroupText>
                        Audio URL
                    </InputGroupText>
                    <Input placeholder="URL" value={audioURL} onChange={(e) => setAudioURL(e.target.value)} />
                    <InputGroupText>
                        (mp3)
                    </InputGroupText>
                </InputGroup>
                <AnswerForm
                    answer={correctAnswer}
                    answerChanged={setCorrectAnswer}
                    isCorrectAnswer={true}
                    onCorrectAnswerSelected={() => setCorrectAnswerIndex(i)} />
            </Row>
        </div>
        <div>
            <Button color="success" className="my-text" disabled={!formIsValid()} onClick={handleSubmitPressed}>Submit</Button>
        </div>
    </div>
}

export default CardForm