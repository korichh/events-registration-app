import { useState } from "react"

function Show({ className, initialParams, setSearchParams }) {
    const { perPage, sortBy, order } = initialParams
    const [show, setShow] = useState(perPage)
    const showOptions = [4, 8, 12]

    const handleShowChange = (e) => {
        const { value } = e.target
        setShow(value)
        setSearchParams({ perPage: value, page: 1, sortBy: sortBy, order: order })
    }

    return (
        <label className={`show ${className}`}>
            <span>Show per page:</span>
            <select value={show} onChange={handleShowChange}>
                {showOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </label>
    )
}

export default Show