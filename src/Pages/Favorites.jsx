
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom"



function Favorites() {
    const { favorites, removeFromFavorites } = useContext(CartContext)
    const navigate = useNavigate()
    if (favorites.length === 0) {
        return (
            <div className="empty-favorites">
                <h2>Henüz Favori Etkinliğiniz Yok</h2>

            </div>
        )
    }

    return (
        <div className="favorites-page">
            {favorites.map((event) => (
                <div className="favorite-item" key={event.id}>
                    <h2>{event.title}</h2>
                    <button onClick={() => navigate(`/event/${event.id}`)}>
                        Etkinlik Detay
                    </button>
                    <button onClick={() => removeFromFavorites(event)}>Favoriden Çıkar</button>
                </div>
            ))
            }
        </div >
    )

}

export default Favorites