import "dotenv/config"
import axios from "axios"
import cron from "node-cron"
import { Op } from "sequelize"
import { Event } from "../models/index.js"
import logger from "../config/winston.js"

async function fetchAPI() {
    try {
        const TIME_SCOPE = 7
        const APIKEY = process.env.EVENTS_APIKEY || ""
        const SIZE = 200
        const LOCALE = "ca"
        const START_DATE = new Date(new Date().setHours(0, 0, 0, 0)).toISOString().slice(0, 19) + "Z"
        const END_DATE = new Date(new Date().setHours(24 * TIME_SCOPE, 0, 0, 0)).toISOString().slice(0, 19) + "Z"
        let rawEvents = []

        // Fetching {SIZE} events up to {END_DATE}
        const response = await axios("https://app.ticketmaster.com/discovery/v2/events.json", {
            method: "GET",
            params: {
                apikey: APIKEY,
                size: SIZE,
                locale: LOCALE,
                endDateTime: END_DATE,
            }
        })
        const data = response.data
        rawEvents = data._embedded.events

        // Removing all events older then start date
        await Event.destroy({
            where: { event_date: { [Op.lte]: START_DATE } }
        })

        // Adding new fetched events and ensuring that event does not already exist
        rawEvents.forEach(async (rawEvent) => {
            try {
                const currentEvent = await Event.findOne({ where: { event_id: rawEvent.id } })
                if (!currentEvent) {
                    await Event.create({
                        event_id: rawEvent.id,
                        event_title: rawEvent.name,
                        event_description: `${rawEvent.type[0].toUpperCase()}${rawEvent.type.slice(1)}`,
                        event_date: new Date(rawEvent.dates.start.localDate || rawEvent.dates.end.localDate),
                        event_organizer: rawEvent.promoter ? rawEvent.promoter.name : "-",
                        event_image: rawEvent.images.find(image => image.width === 640 && image.height === 360).url
                    })
                }
            } catch (err) {
                logger.error(err)
            }
        })

        logger.info(`${START_DATE}: Events Updated`)
    } catch (err) {
        logger.error(err)
    }
}

export default function setEvents() {
    fetchAPI()
        .catch(logger.error)

    cron.schedule("0 0 * * *", () => {
        fetchAPI()
            .catch(logger.error)
    })
}