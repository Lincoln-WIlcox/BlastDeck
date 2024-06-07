import MiniCard from "./MiniCard"

const CardList = ({ cards }) =>
{
    return (
        <>
            {
                cards.map(c =>
                    <MiniCard card={c} />)
            }
        </>
    )
}

export default CardList