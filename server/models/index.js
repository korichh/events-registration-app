import Event from "./Event.js"
import Participant from "./Participant.js"

Event.hasMany(Participant, {
    foreignKey: "event_id",
    sourceKey: "event_id",
})
Participant.belongsTo(Event, {
    foreignKey: "event_id",
    targetKey: "event_id",
})

export { Event, Participant }