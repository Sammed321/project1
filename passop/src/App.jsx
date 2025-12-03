import { Routes, Route } from "react-router-dom"
import Navbar from "./component/Navbar.jsx"
import Home from "./component/home.jsx"
import About from "./component/About.jsx"
import Footer from "./component/Footer.jsx"
import WorkerPage from "./component/worker_page.jsx"
import WorkerLogin from "./component/WorkerLogin.jsx"
import WorkerDashboard from "./component/WorkerDashbord.jsx"
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/workerpage" element={<WorkerPage />}></Route>
        <Route path="/worker-login" element={<WorkerLogin />}></Route>
        <Route path="/worker-dashboard" element={<WorkerDashboard />}></Route>
      </Routes>

      <Footer />
    </>
  )
}

export default App
