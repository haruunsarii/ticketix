
const events = [
    {
        id: 1,
        title: "Tarkan Konseri",
        category: "Konser",
        city: "İstanbul",
        date: "2027-01-01",
        time: "20:00",
        location: "Tüyap",
        image: "tarkan.jpg",
        description: "Tarkan'ın muhteşem konseri!",
        ticketTypes: [{
            type: "VIP",
            price: 1500
        },
        {
            type: "Normal",
            price: 800
        }]
    },
    {
        id: 2,
        title: "Genco Erkal - Maskeli Balo",
        category: "Tiyatro",
        city: "Ankara",
        date: "2027-01-02",
        time: "20:00",
        location: "Cevahir AVM",
        image: "tiyatro.jpg",
        description: "Tiyatro oyunumuz!",
        ticketTypes: [{
            type: "VIP",
            price: 1000
        },
        {
            type: "Normal",
            price: 500
        }]
    },
    {
        id: 3,
        title: "Caz",
        category: "Festival",
        city: "İzmir",
        date: "2027-01-03",
        time: "20:00",
        location: "Kültürpark",
        image: "festival.jpg",
        description: "Festivalimiz!",
        ticketTypes: [{
            type: "VIP",
            price: 2000
        },
        {
            type: "Normal",
            price: 1000
        }]
    }
]

export default events
