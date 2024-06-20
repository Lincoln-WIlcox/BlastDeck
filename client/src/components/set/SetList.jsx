import { Card } from "reactstrap"
import MiniSet from "./MiniSet"

const SetList = ({ sets }) =>
{
    return <Card className="d-flex flex-column bg-black-olive">
        {
            sets.map(s =>
                <MiniSet key={s.id + "s"} set={s} />
            )
        }
    </Card>

}

export default SetList