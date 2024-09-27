import { query, body, param, matchedData, validationResult } from "express-validator"
import { Op, literal } from "sequelize"
import sequelize from "../../config/sequelize.js"
import logger from "../../config/winston.js"
import { ValidationError, UnicityError } from "../../addons/index.js"
import { Event, Participant } from "../../models/index.js"

const TODAY = new Date(new Date().setHours(0, 0, 0, 0)).toISOString()

const eventsController = {
    getEvents: [
        query("perPage").customSanitizer((value) => isNaN(value) || value < 1 ? 12 : Number(value)),
        query("page").customSanitizer((value) => isNaN(value) || value < 1 ? 1 : Number(value)),
        query("sortBy").escape().trim().toLowerCase(),
        query("order").escape().trim().toLowerCase(),
        async (req, res) => {
            try {
                const errors = validationResult(req)
                if (!errors.isEmpty()) throw new ValidationError()

                let { perPage, page, sortBy, order } = matchedData(req)

                const totalCount = await Event.count()

                const totalPages = Math.ceil(totalCount / perPage)
                const currentPage = Math.min(page, totalPages)
                const offset = (currentPage - 1) * perPage

                const allowedSort = ["date", "title", "organizer"]
                sortBy = allowedSort.includes(sortBy) ? `event_${sortBy}` : `event_${allowedSort[0]}`

                const allowedOrder = ["asc", "desc"]
                order = allowedOrder.includes(order) ? order : allowedOrder[0]

                const events = totalCount !== 0
                    ? await Event.findAll({
                        attributes: {
                            include: [
                                [
                                    literal(`(
                                        SELECT COUNT(*)
                                        FROM Participants p
                                        WHERE p.event_id = Event.event_id
                                        AND p.registration_date >= ${sequelize.escape(TODAY)}
                                    )`),
                                    "registered_today"
                                ]
                            ]
                        },
                        limit: perPage,
                        offset: offset,
                        order: [[sortBy, order]]
                    })
                    : []

                const pagination = {
                    total: totalPages,
                    current: currentPage
                }

                res.status(200).json({ events, pagination, message: "Success" })
            } catch (err) {
                if (err.name === "ValidationError") {
                    res.status(400).json({ message: "Invalid Arguments" })
                } else {
                    res.status(500).json({ message: "Internal Server Error" })
                    logger.error(err)
                }
            }
        }
    ],
    getEvent: [
        param("eventId").escape().trim(),
        async (req, res) => {
            try {
                const errors = validationResult(req)
                if (!errors.isEmpty()) throw new ValidationError()

                let { eventId } = matchedData(req)

                const event = await Event.findOne({
                    where: { event_id: eventId }
                })

                res.status(200).json({ event, message: "Success" })
            } catch (err) {
                if (err.name === "ValidationError") {
                    res.status(400).json({ message: "Invalid Arguments" })
                } else {
                    res.status(500).json({ message: "Internal Server Error" })
                    logger.error(err)
                }
            }
        }
    ],
    getEventParticipants: [
        param("eventId").escape().trim(),
        query("s").escape().trim().toLowerCase(),
        async (req, res) => {
            try {
                const errors = validationResult(req)
                if (!errors.isEmpty()) throw new ValidationError()

                let { eventId, s } = matchedData(req)

                const eventParticipants = await Event.findOne({
                    attributes: {
                        include: [
                            [
                                literal(`(
                                    SELECT COUNT(*)
                                    FROM Participants p
                                    WHERE p.event_id = Event.event_id
                                    AND p.registration_date >= ${sequelize.escape(TODAY)}
                                )`),
                                "registered_today"
                            ]
                        ]
                    },
                    include: [{
                        model: Participant,
                        required: false,
                        where: {
                            [Op.or]: [
                                { participant_fullname: { [Op.substring]: s } },
                                { participant_email: { [Op.substring]: s } }
                            ]
                        },
                        order: [["participant_id", "desc"]]
                    }],
                    where: { event_id: eventId },
                })

                res.status(200).json({ eventParticipants, message: "Success" })
            } catch (err) {
                if (err.name === "ValidationError") {
                    res.status(400).json({ message: "Invalid Arguments" })
                } else {
                    res.status(500).json({ message: "Internal Server Error" })
                    logger.error(err)
                }
            }
        }
    ],
    registerParticipant: [
        param("eventId").escape().trim(),
        body("fullname").escape().trim().isLength({ min: 3, max: 50 }),
        body("email").escape().trim().isEmail().isLength({ min: 5, max: 50 }),
        body("birth").escape().trim().isDate().toDate(),
        body("informed").escape().trim().isLength({ min: 3, max: 50 }),
        async (req, res) => {
            try {
                const errors = validationResult(req)
                if (!errors.isEmpty()) throw new ValidationError()

                let { eventId, fullname, email, birth, informed } = matchedData(req)

                const participant = await Participant.findOne({ where: { participant_email: email } })
                if (participant) throw new UnicityError()

                await Participant.create({
                    event_id: eventId,
                    participant_fullname: fullname,
                    participant_email: email,
                    participant_birth: birth,
                    participant_informed: informed
                })

                res.status(200).json({ message: "Success" })
            } catch (err) {
                if (err.name === "ValidationError") {
                    res.status(400).json({ message: "Invalid Arguments" })
                } else if (err.name === "UnicityError") {
                    res.status(400).json({ message: "The email address is already in use" })
                } else {
                    res.status(500).json({ message: "Internal Server Error" })
                    logger.error(err)
                }
            }
        }
    ]
}

export default eventsController