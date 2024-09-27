import Sort from "./Sort"
import Show from "./Show"
import EventItem from "./EventItem"
import Pagination from "./Pagination"

function EventsList({ events, pagination, initialParams, setSearchParams }) {
    return (
        events.length > 0 ? (
            <>
                <Sort className="events__sort" initialParams={initialParams} setSearchParams={setSearchParams} />
                <Show className="events__show" initialParams={initialParams} setSearchParams={setSearchParams} />
                <ul className="events-list events__list">
                    {events.map(event => (
                        <EventItem key={event.event_id} event={event} />
                    ))}
                </ul>
                <Pagination className="events__pagination" pagination={pagination} initialParams={initialParams} setSearchParams={setSearchParams} />
            </>
        ) : (
            <p>No events available.</p>
        )
    )
}

export default EventsList