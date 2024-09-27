import { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import ParticipantsList from "../components/ParticipantsList"
import NotFound from "./NotFound"

function EventParticipants() {
    const { eventId } = useParams()
    const [exists, setExists] = useState(true)
    const [loading, setLoading] = useState(true)
    const [eventTitle, setEventTitle] = useState("")
    const [eventRegistered, setEventRegistered] = useState(0)
    const [eventImage, setEventImage] = useState("")
    const [participants, setParticipants] = useState([])
    const [querySearch, setQuerySearch] = useState("")

    useEffect(() => {
        (async () => {
            try {
                const query = new URLSearchParams({ s: querySearch }).toString()

                const response = await fetch(`/api/events/${eventId}/participants?${query}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message)
                } else {
                    if (!data.eventParticipants) {
                        setExists(false)
                    } else {
                        setEventTitle(data.eventParticipants.event_title)
                        setEventRegistered(parseInt(data.eventParticipants.registered_today))
                        setEventImage(data.eventParticipants.event_image)
                        setParticipants(data.eventParticipants.Participants)
                    }
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        })()
    }, [eventId, querySearch])

    if (!exists) return <NotFound />

    return (
        <section className="participants">
            <div className="container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="participants__inner">
                        <div className="participants__head">
                            <div className="participants__top">
                                <h1>"{eventTitle}" participants</h1>
                                <div className="participants__registered">
                                    <span>Registered today:</span>
                                    <strong>{eventRegistered}</strong>
                                </div>
                            </div>
                            <div className="participants__image">
                                <img src={eventImage} alt={eventTitle} loading="lazy" width="242" height="136" />
                            </div>
                        </div>
                        <div className="participants__body">
                            <ParticipantsList participants={participants} querySearch={querySearch} setQuerySearch={setQuerySearch} />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default EventParticipants