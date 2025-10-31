import { Link, useNavigate, NavLink } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

let sidebarLinks = [
    {
        role: "employee", links: [{ label: "Dashboard", path: "/" }, { label: "My Assets", path: "/myAssets" },
        { label: "Requests", path: "/requests" }]
    },
    {
        role: "admin", links: [{ label: "Dashboard", path: "/" },
        { label: "Assets", path: "/assets" }, { label: "Employees", path: "/employees" },
        { label: "Assigned Assets", path: "/assigned-assets" }, { label: "Requests", path: "/requests" }]
    },
    {
        role: "super admin", links: [{ label: "Dashboard", path: "/" }, { label: "Admins", path: "/admins" }
            , { label: "Assets", path: "/assets" }, { label: "Employees", path: "/employees" }
            , { label: "Assigned Assets", path: "/assigned-assets" }, { label: "Requests", path: "/requests" }]
    }
]

function Sidebar() {
    const { logout, user } = useAuth()
    const navigate = useNavigate()
    let links = sidebarLinks.find((linkObj) => linkObj.role === user.role)?.links
    async function handleLogout() {
        await logout()
        navigate("/login")
    }
    return (
        <>
            <aside className={"flex flex-col py-10 gap-4 items-center h-full"}>
                <div>
                    <h1 className="text-red-600 text-2xl text-center font-bold">MY COMPANY</h1>
                </div>
                <div className={"flex flex-col py-4 px-2 w-4/5 justify-center gap-8"}>
                    {
                        links.map(myLink => {
                            return <NavLink key={myLink.label} to={myLink.path} className={({ isActive }) => `shadow-md shadow-gray-600 h-10 rounded-2xl text-center content-center text-xl font-semibold w-full hover:bg-gray-200 ${isActive ? "bg-gray-300" : ""}`}>{myLink.label}</NavLink>
                        })
                    }
                </div>

                <div className={"flex flex-col py-4 px-2 w-4/5 flex-1 justify-end items-center gap-4"}>

                    <Link to={""} className="shadow-md shadow-gray-600 h-10 rounded-2xl text-center content-center text-xl font-semibold w-full hover:bg-gray-200">Profile</Link>

                    <button className="bg-red-500 rounded-2xl h-10 w-1/2 text-xl font-semibold text-white cursor-pointer hover:bg-white hover:text-red-500" onClick={handleLogout}>Logout</button>
                </div>
            </aside>
        </>
    )
}
export default Sidebar