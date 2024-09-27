import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import EventParticipants from "./pages/EventParticipants"
import EventRegister from "./pages/EventRegister"
import NotFound from "./pages/NotFound"

function App() {
    return (
        <Router>
            <main className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events/:eventId" element={<EventParticipants />} />
                    <Route path="/events/:eventId/register" element={<EventRegister />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </Router>
    )
}

export default App
