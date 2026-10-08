import { useParams } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { CartContext } from "../Context/CartContext"

function EventDetail() {
    const { id } = useParams()
    const [apiEvents, setApiEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function verileriGetir() {
            try {
                const response = await fetch("/events.json")
                if (!response.ok) {
                    throw new Error("Etkinlikler alınamadı")
                }
                const data = await response.json()
                setApiEvents(data)
                setLoading(false)
            } catch (error) {
                setError("Etkinlikler alınamadı.")
                setLoading(false)
            }
        }
        verileriGetir()
    }, [])






    const [selectedTicket, setSelectedTicket] = useState(null)
    const [quantity, setQuantity] = useState(1)

    const { addToCart, addToFavorites, favorites } = useContext(CartContext)
    const [addedToCart, setAddedToCart] = useState(false)
    const [addedToFavorites, setAddedToFavorites] = useState(false)
    const event = apiEvents.find((event) => event.id === Number(id))

    useEffect(() => {
        if (event && favorites.some((item) => item.id === event.id)) {
            setAddedToFavorites(true)
        }
    }, [event, favorites])

    if (loading) {
        return <h2>Yükleniyor...</h2>
    }
    if (error) {
        return <h2>{error}</h2>
    }
    if (!event) {
        return <h2>Etkinlik bulunamadı</h2>
    }



    return (
        <div className="event-detail">
            <h2>{event.title}</h2>
            <p>{event.city}</p>
            <p>{event.date} - {event.time}</p>
            <p>{event.location}</p>
            <p>{event.description}</p>

            <img src={event.image} />

            <p>{event.category}</p>
            <button
                disabled={addedToFavorites}
                onClick={() => {
                    addToFavorites(event)
                    setAddedToFavorites(true)
                }}>
                {
                    addedToFavorites ? "Favorilere Eklendi" : "Favorilere Ekle"
                }
            </button>
            {
                event.ticketTypes.map((ticket) => (
                    <div className="ticket-option" key={ticket.type}>
                        {`${ticket.type} - ${ticket.price}`}

                        <button
                            className={
                                selectedTicket?.type === ticket.type
                                    ? "selected"
                                    : ""
                            }
                            onClick={() => {
                                setSelectedTicket(ticket)
                                setAddedToCart(false)
                            }}
                        >
                            Bilet Al
                        </button>

                    </div>
                ))
            }

            <div>
                <button
                    onClick={() => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1)
                        }
                    }}
                >
                    -
                </button>

                <span>{quantity}</span>

                <button
                    onClick={() => setQuantity(quantity + 1)}
                >
                    +
                </button>
            </div>

            <button
                className="add-cart-button"
                disabled={!selectedTicket}
                onClick={() => {
                    addToCart({
                        event,
                        quantity,
                        ticket: selectedTicket
                    })
                    setAddedToCart(true)
                }}>
                {addedToCart ? "Sepete Eklendi" : "Sepete Ekle"}
            </button>
        </div >
    )
}

export default EventDetail
