import { CartContext } from "../Context/CartContext"
import { useContext } from "react"
import { Link } from "react-router-dom"

function Navbar() {
    const { cart } = useContext(CartContext)
    const totalQuantity = cart.reduce((toplam, item) => {
        return toplam + item.quantity
    }, 0)
    return (
        <div className="navbar">
            <Link to="/">Etkinlikler</Link>
            <Link to="/cart">Sepetim ({totalQuantity})</Link>
            <Link to="/favorites">Favoriler ❤️</Link>
        </div>
    )
}

export default Navbar