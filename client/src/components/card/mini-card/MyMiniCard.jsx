import MiniCard from "./MiniCard"
import MiniCardEditButton from "./MiniCardEditButton"
import MiniCardDeleteButton from "./MiniCardDeleteButton"
import MiniCardSidebar from "./MiniCardSidebar"
import MiniCardImage from "./MiniCardImage"
import MiniCardBody from "./MiniCardBody"
import MiniCardHeader from "./MiniCardHeader"
import MiniCardHeaderText from "./MiniCardHeaderText"
import MiniCardStarButton from "./MiniCardStarButton"
import MiniCardSubheader from "./MiniCardSubheader"
import MiniCardContent from "./MiniCardContent"

const MyMiniCard = ({ card, onCardsChanged }) =>
{
    return <MiniCard card={card}>
        <MiniCardSidebar>
            <MiniCardImage src={card?.imageURL} />
        </MiniCardSidebar>

        <MiniCardBody>
            <MiniCardHeader>
                <MiniCardHeaderText>{card?.englishWord}</MiniCardHeaderText>
                <MiniCardHeaderText>{card?.correctAnswer.word}</MiniCardHeaderText>
                <MiniCardStarButton starred={card?.starred} onStarChanged={onCardsChanged} />
            </MiniCardHeader>
            <MiniCardSubheader>
                {
                    card?.answers.map(a =>
                        a.word != card?.correctAnswer.word &&
                        <p key={a.id + "a"} className="my-text smaller-text">
                            {a.word}
                        </p>
                    )
                }
            </MiniCardSubheader>
            <MiniCardContent>
                <MiniCardEditButton />
                <MiniCardDeleteButton onCardDeleted={onCardsChanged} />
            </MiniCardContent>
            {/* <CardContext.Provider value={card}>
                        <Row>
                            {
                                children && children
                            }
                        </Row>
                    </CardContext.Provider> */}
        </MiniCardBody>
    </MiniCard>
}

export default MyMiniCard