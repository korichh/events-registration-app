function Pagination({ className, pagination, initialParams, setSearchParams }) {
    if (!pagination || pagination.total <= 1) return null

    const { sortBy, order, perPage } = initialParams
    let { total, current } = pagination
    let delta = 1
    let items = []

    const handlePageChange = (newPage) => {
        setSearchParams({ perPage: perPage, page: newPage, sortBy: sortBy, order: order })
    }

    const addPage = (i, isCurrent) => {
        if (isCurrent) {
            items.push(<span key={i} className="pagination__item pagination__current">{i}</span>)
        } else {
            items.push(<button key={i} className="pagination__item" onClick={() => handlePageChange(i)}>{i}</button>)
        }
    }

    const addEllipsis = (i) => {
        items.push(<span key={i} className="pagination__item pagination__ellipsis">...</span>)
    }

    if (current > 1) items.push(<button key="prev" className="pagination__item pagination__arrow" onClick={() => handlePageChange(current - 1)}>←</button>)
    addPage(1, current === 1)
    if (total > 3) addPage(2, current === 2)

    let hasLeftEllipsis = false
    let hasRightEllipsis = false

    for (let i = 3; i <= total - 2; i++) {
        if (i >= current - delta && i <= current + delta) {
            addPage(i, i === current)
        } else if (i < current - delta && !hasLeftEllipsis) {
            addEllipsis("left")
            hasLeftEllipsis = true
        } else if (i > current + delta && !hasRightEllipsis) {
            addEllipsis("right")
            hasRightEllipsis = true
        }
    }

    if (total > 2) addPage(total - 1, current === total - 1)
    if (total > 1) addPage(total, current === total)
    if (current < total) items.push(<button key="next" className="pagination__item pagination__arrow" onClick={() => handlePageChange(current + 1)}>→</button>)

    return (
        <div className={`pagination ${className}`}>{items}</div>
    )
}

export default Pagination