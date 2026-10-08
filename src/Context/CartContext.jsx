import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    )
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || [])

    function addToCart({ event, quantity, ticket }) {
        const item = {
            event,
            quantity,
            ticket
        }

        const existingItem = cart.find((item) => item.event.id === event.id && item.ticket.type === ticket.type)
        if (existingItem) {
            setCart(
                prevCart => prevCart.map((item) => {
                    if (item.event.id === event.id && item.ticket.type === ticket.type) {
                        return {
                            ...item,
                            quantity: item.quantity + quantity
                        }
                    }
                    return item
                })
            )
            return
        }

        setCart(prevCart => [...prevCart, item])


    }
    function removeFromCart(id, ticketType) {
        setCart(cart.filter(item => item.event.id !== id || item.ticket.type !== ticketType))
    }
    function increaseQuantity(id, ticketType) {
        setCart(prevCart => prevCart.map((item) => {
            if (item.event.id === id && item.ticket.type === ticketType) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        }
        ))
    }
    function decreaseQuantity(id, ticketType) {
        const item = cart.find(
            (item) =>
                item.event.id === id &&
                item.ticket.type === ticketType)
        if (!item) return
        if (item.quantity === 1) {
            setCart(prevCart =>
                prevCart.filter(
                    (item) =>
                        !(item.event.id === id &&
                            item.ticket.type === ticketType)
                )
            )
            return
        }
        setCart(
            prevCart => prevCart.map((item) => {
                if (
                    item.event.id === id &&
                    item.ticket.type === ticketType
                ) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                }
                return item
            })
        )
    }
    function addToFavorites(event) {

        if (favorites.some((item) => item.id === event.id)) {
            return
        }
        setFavorites([...favorites, event])
    }
    function removeFromFavorites(event) {
        setFavorites(favorites.filter(item => item.id !== event.id))
    }


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, addToFavorites, favorites, removeFromFavorites }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
export { CartContext }