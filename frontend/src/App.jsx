import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ErrorPage from "./pages/ErrorPage"
import ProtectedRoute from "./ProtectedRoute"
import Dashboard from "./components/Home/Dashboard"
import { Toaster } from "react-hot-toast"
import Admins from "./components/Home/Admins"
import Employees from "./components/Home/Employees"

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        {/* protected route */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />}></Route>
          <Route path="assets" element={<h1>Assets</h1>}></Route>
          <Route path="admins" element={<Admins />}></Route>
          <Route path="myAssets" element={<h1>MyAsset</h1>}></Route>
          <Route path="requests" element={<h1>Requests</h1>}></Route>
          <Route path="profile" element={<h1>Profile</h1>}></Route>
          <Route path="employees" element={<Employees />}></Route>
          <Route path="assigned-assets" element={<h1>Assigned Assets</h1>}></Route>
        </Route>

        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <Toaster position="top-center" ></Toaster>
    </>
  )
}
export default App