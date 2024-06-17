import MiniSet from "./MiniSet"
import PracticeMiniSet from "./PracticeMiniSet"

const PracticeSetList = ({ sets }) =>
{
    return <div className="d-flex flex-column">
        {
            sets.map(s =>
                <PracticeMiniSet key={s.id + "s"} set={s} />
            )
        }
    </div>

}

export default PracticeSetList