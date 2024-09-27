import { Link } from "react-router-dom"

function NotFound() {
    return (
        <section className="not-found">
            <h1>404</h1>
            <p>This page does not exist.</p>
            <Link to="/">Home Page →</Link>
        </section>
    )
}

export default NotFound