import { Badge, Button, Card, CardBody, CardImg, CardImgOverlay, CardSubtitle, CardText, CardTitle, Col, Row, Spinner } from "reactstrap";
import "./MiniCard.css"
import { starCard, unStarCard } from "../../../managers/cardManager";
import { createContext, useContext } from "react";
import MiniCardImage from "./MiniCardImage";
import MiniCardSidebar from "./MiniCardSidebar";
import MiniCardHeader from "./MiniCardHeader";
import MiniCardStarButton from "./MiniCardStarButton";
import MiniCardHeaderText from "./MiniCardHeaderText";
import MiniCardSubheader from "./MiniCardSubheader";
import MiniCardContent from "./MiniCardContent";
import MiniCardEditButton from "./MiniCardEditButton";
import MiniCardDeleteButton from "./MiniCardDeleteButton"
import MiniCardBody from "./MiniCardBody";

export const CardContext = createContext()

const MiniCard = ({ card, children }) =>
{

    return <Row className="d-flex mt-5">
        <Card className="bg-black-olive shadow-sm">
            <CardBody>
                <CardContext.Provider value={card}>
                    <Row className="d-flex flex-nowrap">
                        {children}
                        {/* <MiniCardSidebar>
                        <MiniCardImage src={card.imageURL} />
                    </MiniCardSidebar>

                    <MiniCardBody>
                        <MiniCardHeader>
                            <MiniCardHeaderText>{card.englishWord}</MiniCardHeaderText>
                            <MiniCardHeaderText>{card.correctAnswer.word}</MiniCardHeaderText>
                            <MiniCardStarButton starred={card.starred} onStarButtonPress={handleStarButtonPress} onUnstarButtonPress={handleUnstarButtonPress} />
                        </MiniCardHeader>
                        <MiniCardSubheader>
                            {
                                card.answers.map(a =>
                                    a.word != card.correctAnswer.word &&
                                    <p key={a.id + "a"} className="my-text smaller-text">
                                        {a.word}
                                    </p>
                                )
                            }
                        </MiniCardSubheader>
                        <MiniCardContent>
                            <MiniCardEditButton />
                            <MiniCardDeleteButton />
                        </MiniCardContent>
                        {/* <CardContext.Provider value={card}>
                        <Row>
                            {
                                children && children
                            }
                        </Row>
                    </CardContext.Provider> 
                </MiniCardBody>*/}
                    </Row>
                </CardContext.Provider>
            </CardBody>
        </Card >
    </Row>
}

export default MiniCard