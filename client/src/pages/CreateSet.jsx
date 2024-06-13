import { Button, Input, Label } from "reactstrap"
import { createSetByMe } from "../managers/setManager"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const CreateSet = () =>
{
    const [setName, setSetName] = useState("")
    const navigate = useNavigate()

    const handleSubmitPress = () =>
    {
        createSetByMe(setName).then(
            () =>
            {
                navigate("/set")
            }
        )
    }

    return <div className="d-flex flex-column gap-3">
        <div className="d-flex gap-3">
            <Label className="my-text text-nowrap" htmlFor="set-name">Choose A Name:</Label>
            <Input id="set-name" type="text" placeholder="Set Name" value={setName} onChange={(e) => setSetName(e.target.value)} />
        </div>
        <div>
            <Button className="my-text" onClick={handleSubmitPress}>Submit</Button>
        </div>
    </div>
}

export default CreateSet