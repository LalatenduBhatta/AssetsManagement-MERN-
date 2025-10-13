import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"

function ProtectedRoute(props) {
    //verify the auth
    const { user, loading } = useAuth()
    console.log(user, loading)

    if (loading) return <h1>Loading...............</h1>

    if (!user) return < Navigate to={"/login"} replace />

    return (
        <>
            {props.children}
        </>
    )
}
export default ProtectedRoute