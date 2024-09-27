import ParticipantItem from "./ParticipantItem"
import Search from "./Search"

function ParticipantsList({ participants, querySearch, setQuerySearch }) {
    return (
        <>
            <Search className="participants__search" querySearch={querySearch} setQuerySearch={setQuerySearch} />
            {participants.length > 0 ? (

                <ul className="participants-list participants__list">
                    {participants.map(participant => (
                        <ParticipantItem key={participant.participant_id} participant={participant} />
                    ))}
                </ul>
            ) : (
                <p>No participants available.</p>
            )}
        </>
    )
}

export default ParticipantsList