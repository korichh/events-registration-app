function ParticipantItem({ participant }) {
    return (
        <li className="participant-item participant-list__item">
            <div className="participant-item__inner">
                <div className="participant-item__content">
                    <h2 className="participant-item__fullname">{participant.participant_fullname}</h2>
                    <div className="participant-item__email">{participant.participant_email}</div>
                </div>
            </div>
        </li>
    )
}

export default ParticipantItem