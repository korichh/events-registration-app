import { Model, DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"

class Event extends Model { }

Event.init(
    {
        event_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        event_title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        event_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        event_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true,
        },
        event_organizer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        event_image: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: "Event",
        tableName: "Events",
    }
)

export default Event