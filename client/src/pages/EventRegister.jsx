import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import RegisterParticipant from "../components/RegisterParticipant"
import NotFound from "./NotFound"

function EventRegister() {
    const { eventId } = useParams()
    const [exists, setExists] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`/api/events/${eventId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                const data = await response.json()
                
                if (!response.ok) {
                    throw new Error(data.message)
                } else {
                    if (!data.event) {
                        setExists(false)
                    }
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        })()
    }, [eventId])

    if (!exists) return <NotFound />

    return (
        <section className="register">
            <div className="container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="register__inner">
                        <div className="register__head">
                            <h1>Event registration</h1>
                        </div>
                        <div className="register__body">
                            <RegisterParticipant />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default EventRegister