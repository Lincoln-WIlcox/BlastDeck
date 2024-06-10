import { Badge, Button, Card, CardBody, CardImg, CardImgOverlay, CardSubtitle, CardText, CardTitle, Col, Row, Spinner } from "reactstrap";
import "./MiniCard.css"

const MiniCard = ({ card }) =>
{
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
                                card.starred
                                    ? <Button><i className="fa fa-star-o" aria-hidden="true"></i></Button>
                                    : <Button><i className="fa fa-star" aria-hidden="true"></i></Button>
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
                </Col>
            </Row>
        </CardBody>
    </Card>
}

export default MiniCard