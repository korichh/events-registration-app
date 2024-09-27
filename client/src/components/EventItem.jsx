import { Link } from "react-router-dom"

function EventItem({ event }) {
    return (
        <li className="event-item event-list__item">
            <div className="event-item__inner">
                <div className="event-item__image">
                    <img src={event.event_image} alt={event.event_title} loading="lazy" width="242" height="136" />
                </div>
                <div className="event-item__content">
                    <h2 className="event-item__title" title={event.event_title}>{event.event_title}</h2>
                    <div className="event-item__description">{event.event_description}</div>
                </div>
                <div className="event-item__btns">
                    <Link to={`/events/${event.event_id}/register`}>Register</Link>
                    <Link to={`/events/${event.event_id}`}>View</Link>
                </div>
                <div className="event-item__registered">
                    <span>Registered today:</span>
                    <strong>{event.registered_today}</strong>
                </div>
            </div>
        </li>
    )
}

export default EventItem