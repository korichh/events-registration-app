function Sort({ className, initialParams, setSearchParams }) {
    const { sortBy, order, perPage } = initialParams

    const handleSortChange = (newSortBy) => {
        let newOrder = sortBy === newSortBy && order === "asc" ? "desc" : "asc"
        setSearchParams({ perPage: perPage, page: 1, sortBy: newSortBy, order: newOrder })
    }

    return (
        <div className={`sort ${className}`}>
            <button onClick={() => handleSortChange("date")}>
                <span>Sort by Date {sortBy === "date" ? (order === "asc" ? "↑" : "↓") : ""}</span>
            </button>
            <button onClick={() => handleSortChange("title")}>
                <span>Sort by Title {sortBy === "title" ? (order === "asc" ? "↑" : "↓") : ""}</span>
            </button>
            <button onClick={() => handleSortChange("organizer")}>
                <span>Sort by Organizer {sortBy === "organizer" ? (order === "asc" ? "↑" : "↓") : ""}</span>
            </button>
        </div>
    )
}

export default Sort