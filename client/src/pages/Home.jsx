import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import EventsList from "../components/EventsList"

function Home() {
    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState([])
    const [pagination, setPagination] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()

    const initialParams = useMemo(() => ({
        perPage: searchParams.get("perPage") || 12,
        page: searchParams.get("page") || 1,
        sortBy: searchParams.get("sortBy") || "date",
        order: searchParams.get("order") || "asc"
    }), [searchParams])

    useEffect(() => {
        (async () => {
            try {
                const query = new URLSearchParams(initialParams).toString()

                const response = await fetch(`/api/events?${query}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message)
                } else {
                    setEvents(data.events)
                    setPagination(data.pagination)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        })()
    }, [initialParams])

    return (
        <section className="events">
            <div className="container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="events__inner">
                        <div className="events__head">
                            <h1>Events</h1>
                        </div>
                        <div className="events__body">
                            <EventsList events={events} pagination={pagination} initialParams={initialParams} setSearchParams={setSearchParams} />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Home