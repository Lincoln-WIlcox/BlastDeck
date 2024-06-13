import MiniSet from "./MiniSet"

const SetList = ({ sets }) =>
{
    return sets.map(s =>
        <MiniSet />)
}

export default SetList