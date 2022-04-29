import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
        <ul className="navbar">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/product/6781">Product</Link>
            </li>
        </ul>
    )
}