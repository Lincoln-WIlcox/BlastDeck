import MiniSet from "./MiniSet"

const SetList = ({ sets }) =>
{
    return <div className="d-flex flex-column">
        {
            sets.map(s =>
                <MiniSet key={s.id + "s"} set={s} />)
        }
    </div>

}

export default SetList