import { useContext } from "react"
import { CartContext } from "../Context/CartContext"
import { useNavigate } from "react-router-dom"

function Cart() {
    const navigate = useNavigate()
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)

    const total = cart.reduce((toplam, item) => {
        return toplam + item.ticket.price * item.quantity
    }, 0)

    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <button onClick={() => navigate("/")}>
                    Anasayfaya Git
                </button>
                <h2>Sepetiniz boş.</h2>
            </div>
        )
    }

    return (
        <div className="cart-page">
            {cart.map((item) => (
                <div className="cart-item" key={`${item.event.id}-${item.ticket.type}`}>
                    <h2>{item.event.title}</h2>
                    <p>Bilet: {item.ticket.type}</p>
                    <p>Adet: {item.quantity}
                        <button className="quantity-button" onClick={() => increaseQuantity(item.event.id, item.ticket.type)}>+</button>
                        <button className="quantity-button" onClick={() => decreaseQuantity(item.event.id, item.ticket.type)}>-</button>
                    </p>
                    <p>Birim fiyat: {item.ticket.price} TL</p>
                    <p>
                        Ara toplam: {item.ticket.price * item.quantity} TL
                    </p>

                    <button onClick={() => removeFromCart(item.event.id, item.ticket.type)}>
                        Sil
                    </button>
                </div>
            ))}

            <h2 className="cart-total">Toplam: {total} TL</h2>
        </div>
    )
}

export default Cart