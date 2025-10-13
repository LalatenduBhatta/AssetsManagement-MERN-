import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../components/Home/Sidebar"

function Home() {
    const navigate = useNavigate()

    return (
        <>
            <div className="flex w-full min-h-screen">
                {/* sidebar */}
                <div className="w-[20%] bg-amber-200">
                    <Sidebar />
                </div>
                {/*main content*/}
                <div className="flex-1 bg-blue-500">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default Home