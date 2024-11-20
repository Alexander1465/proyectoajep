import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError();
    console.error(error);

    return (
        <div style={{textAlign:"center"}}>
            <h1>Unexpected Aplication Error!</h1>
            <p>404 Not Found</p>
        </div>
    )
}