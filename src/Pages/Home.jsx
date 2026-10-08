import EventCard from "../components/EventCard"
import { useState, useEffect } from "react"

function Home() {
    const [selectedCategory, setSelectedCategory] = useState("Tümü")
    const [selectedCity, setSelectedCity] = useState("Tümü")
    const [selectedDate, setSelectedDate] = useState("Tümü")
    const [apiEvents, setApiEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const filteredEvents = selectedCategory === "Tümü" ? apiEvents : apiEvents.filter((event) => event.category === selectedCategory)
    const filteredByCity = selectedCity === "Tümü" ? filteredEvents : filteredEvents.filter((event) => event.city === selectedCity)
    const filteredByDate = selectedDate === "Tümü" ? filteredByCity : filteredByCity.filter((event) => event.date === selectedDate)

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

    if (loading) {
        return <h2>Yükleniyor...</h2>
    }

    if (error) {
        return <h2>{error}</h2>
    }


    return (
        <div className="home">
            <div className="filters">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="Tümü">Tümü</option>
                    <option value="Konser">Konser</option>
                    <option value="Tiyatro">Tiyatro</option>
                    <option value="Festival">Festival</option>
                </select>
                <select name="city" id="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="Tümü">Tümü</option>
                    <option value="İstanbul">İstanbul</option>
                    <option value="Ankara">Ankara</option>
                    <option value="İzmir">İzmir</option>
                </select>
                <select name="date" id="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                    <option value="Tümü">Tümü</option>
                    <option value="2027-01-01">2027-01-01</option>
                    <option value="2027-01-02">2027-01-02</option>
                    <option value="2027-01-03">2027-01-03</option>
                </select>
            </div>
            <div className="events">
                {filteredByDate.map((event) => (
                    <EventCard event={event} key={event.id} />

                ))}
            </div>
        </div>
    )
}

export default Home