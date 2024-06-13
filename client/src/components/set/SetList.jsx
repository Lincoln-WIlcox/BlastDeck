import MiniSet from "./MiniSet"

const SetList = ({ sets }) =>
{
    return sets.map(s =>
        <MiniSet set={s} />)
}

export default SetList