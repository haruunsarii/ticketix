import { useNavigate } from "react-router-dom"




function EventCard({ event }) {
    const navigate = useNavigate()

    return (
        <div className="event-card">
            <h2>{event.title}</h2>
            <p>{event.city}</p>
            <p>{event.date} - {event.time}</p>
            <p>{event.location}</p>
            <p>{event.description}</p>
            <img className="event-image" src={event.image} alt={event.title} />
            <p>{event.category}</p>
            <button className="detail-button" onClick={() => { navigate(`/event/${event.id}`) }}>Detayları Gör</button>
        </div>
    )
}

export default EventCard