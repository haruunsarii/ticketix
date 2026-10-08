
import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import EventDetail from "./Pages/EventDetail"
import Cart from "./Pages/Cart"
import Navbar from "./components/Navbar"
import Favorites from "./Pages/Favorites"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  )
}

export default App
