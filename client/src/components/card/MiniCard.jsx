import { Badge, Button, Card, CardBody, CardImg, CardImgOverlay, CardSubtitle, CardText, CardTitle, Col, Row, Spinner } from "reactstrap";
import "./MiniCard.css"
import { starCard, unStarCard } from "../../managers/cardManager";
import { createContext, useContext } from "react";

export const CardContext = createContext()

const MiniCard = ({ addStarButton, card, cardsUpdated, children }) =>
{

    const handleStarButtonPress = () =>
    {
        starCard(card.id).then(cardsUpdated)
    }

    const handleUnstarButtonPress = () =>
    {
        unStarCard(card.id).then(cardsUpdated)
    }

    return <Card className="bg-black-olive shadow-sm">
        <CardBody>
            <Row>
                <Col xs={4}>
                    <div className="mini-card-container">
                        <CardImg src={card.imageURL} className="mini-card border-black border-2 shadow-sm" />
                    </div>
                </Col>
                <Col lg>
                    <Row>
                        <div className="d-flex gap-4">
                            <p className="my-text">{card.englishWord}</p>
                            <p className="my-text">{card.correctAnswer.word}</p>
                            {
                                addStarButton && (card.starred
                                    ? <Button onClick={handleStarButtonPress}><i className="fa fa-star-o" aria-hidden="true"></i></Button>
                                    : <Button onClick={handleUnstarButtonPress}><i className="fa fa-star" aria-hidden="true"></i></Button>)
                            }

                        </div>
                    </Row>
                    <Row>
                        <div className="d-flex gap-3">
                            {
                                card.answers.map(a =>
                                    a.word != card.correctAnswer.word &&
                                    <p key={a.id + "a"} className="my-text smaller-text">
                                        {a.word}
                                    </p>
                                )
                            }
                        </div>
                    </Row>
                    <CardContext.Provider value={card}>
                        <Row>
                            {
                                children && children
                            }
                        </Row>
                    </CardContext.Provider>
                </Col>
            </Row>
        </CardBody>
    </Card>
}

export default MiniCard