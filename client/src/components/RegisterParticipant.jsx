import { useState } from "react"
import { useParams, Link } from "react-router-dom"

function RegisterParticipant() {
    const initialFormData = {
        fullname: "",
        email: "",
        birth: "",
        informed: ""
    }
    const [formData, setFormData] = useState(initialFormData)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const { eventId } = useParams()

    const handleChange = (e) => {
        let { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")

        try {
            const response = await fetch(`/api/events/${eventId}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const data = await response.json()

            if (!response.ok) {
                if (response.status === 400) {
                    setErrorMessage(data.message)
                } else {
                    throw new Error(data.message)
                }
            } else {
                setFormSubmitted(true)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        !formSubmitted ? (
            <form className="register-form register__form" onSubmit={handleSubmit}>
                {errorMessage ? <p className="form-error">{errorMessage}</p> : ""}
                <div className="form-row">
                    <label className="form-column">
                        <span>Full name</span>
                        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} minLength="3" maxLength="50" required />
                    </label>
                </div>
                <div className="form-row">
                    <label className="form-column">
                        <span>Email</span>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} minLength="5" maxLength="50" required />
                    </label>
                </div>
                <div className="form-row">
                    <label className="form-column">
                        <span>Date of birth</span>
                        <input type="date" name="birth" value={formData.birth} onChange={handleChange} required />
                    </label>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <span>Where did you hear about this event?</span>
                        <div className="form-radios">
                            <label className="form-radio">
                                <input type="radio" name="informed" value="Social media" checked={formData.informed === "Social media"} onChange={handleChange} required />
                                <span>Social media</span>
                            </label>
                            <label className="form-radio">
                                <input type="radio" name="informed" value="Friends" checked={formData.informed === "Friends"} onChange={handleChange} required />
                                <span>Friends</span>
                            </label>
                            <label className="form-radio">
                                <input type="radio" name="informed" value="Found myself" checked={formData.informed === "Found myself"} onChange={handleChange} required />
                                <span>Found myself</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        ) : (
            <div className="register-success register__success">
                <p>Registration success!</p>
                <Link to={`/events/${eventId}`}>See Event →</Link>
            </div>
        )
    )
}

export default RegisterParticipant