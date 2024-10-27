import { useNavigate } from "react-router-dom";
import { Button } from "../Button";


interface DetailsBtnProp {
    id: number;
}

export default function DetailsBtn({ id }: DetailsBtnProp): JSX.Element {
    const navigate = useNavigate()

    function getDetails(id: number) {
        navigate(`/details/${id}`)
    }
    return (
        <Button $variant="secondary" onClick={() => getDetails(id)
        }>Details</Button>
    )
}