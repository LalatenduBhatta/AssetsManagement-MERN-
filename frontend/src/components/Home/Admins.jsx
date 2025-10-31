import axios from "axios"
import { useEffect, useState } from "react"
import AdminEditModal from "../AdminEditModel"

function Admins() {
    const [admins, setAdmins] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editAdmin, setEditAdmin] = useState({})
    const fetchAdmins = async () => {
        try {
            let response = await axios.get("http://localhost:8080/api/v1/user/admins",
                { withCredentials: true })
            setAdmins(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (!isModalOpen) {
            fetchAdmins()
        }
    }, [isModalOpen])
    const handleModalOpen = (admin) => {
        setEditAdmin(admin)
        setIsModalOpen(true)
    }
    const handleModalClose = () => {
        setEditAdmin({})
        setIsModalOpen(false)
    }
    const addAdminModal = () => {
        setEditAdmin({}) //for safe adding
        setIsModalOpen(true)
    }
    const handleDelete = async (admin) => {
        try {
            toast.loading("Deleting.......", { id: "delete" })

            await axios.delete("http://localhost:8080/api/v1/user/delete/admin",
                { withCredentials: true, headers: { userid: admin._id } })

            await fetchAdmins()

            toast.success("User Details Deleted", { id: "delete" })
        } catch (error) {
            toast.error("Failed to delete", { id: "delete" })
        }
    }
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 px-2 bg-white dark:bg-gray-900">
                    <label for="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                    </div>
                    {/* ADD BUTTON */}
                    <div>
                        <button className="text-md text-white  hover:bg-white hover:text-blue-500 bg-blue-500 py-2 px-2 rounded-sm border border-blue-400" onClick={addAdminModal}>ADD ADMIN</button>
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Department
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Contact No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins.map((admin) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{admin.name}</div>
                                                <div className="font-normal text-gray-500">{admin.email}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="text-base font-semibold">{admin.department}</div>
                                            <div className="font-normal text-gray-500">{admin.designation}</div>
                                        </td>
                                        <td>
                                            <div className="text-base font-semibold">{admin.mobile}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{admin.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 flex w-full justify-start gap-4">

                                            <button className="text-md text-white  hover:underline bg-blue-500 py-2 px-2 rounded-full"
                                                onClick={() => handleModalOpen(admin)}>Edit user</button>
                                            <button className="text-md text-white hover:underline bg-red-500 py-2 px-2 rounded-full"
                                                onClick={() => handleDelete(admin)}> Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {isModalOpen && <AdminEditModal handleModalClose={handleModalClose} editAdmin={editAdmin} />}
        </>
    )
}
export default Admins