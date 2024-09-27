import { useState, useRef } from "react"

function Search({ className, querySearch, setQuerySearch }) {
    const [search, setSearch] = useState(querySearch)
    const timeoutRef = useRef(null)

    const handleSearchChange = (e) => {
        const { value } = e.target
        setSearch(value)

        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        timeoutRef.current = setTimeout(() => {
            setQuerySearch(value)
        }, 300)
    }

    return (
        <div className={`search ${className}`}>
            <span>Search by:</span>
            <input value={search} onChange={handleSearchChange} placeholder="Fullname or email" />
        </div>
    )
}

export default Search