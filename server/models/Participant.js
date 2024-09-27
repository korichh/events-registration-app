import { Model, DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"

class Participant extends Model { }

Participant.init(
    {
        participant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        participant_fullname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        participant_email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        participant_birth: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        participant_informed: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        registration_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        event_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "Events",
                key: "event_id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: "Participant",
        tableName: "Participants",
        indexes: [
            {
                unique: true,
                fields: ["participant_email"]
            }
        ]
    }
)

export default Participant