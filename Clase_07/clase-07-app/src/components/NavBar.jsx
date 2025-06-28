import { NavLink } from "react-router";

export function NavBar() {
    return (
        <nav className="w-full px-3 py-2 flex justify-center gap-3 bg-gray-700 text-white">
            <NavLink to="/" end>
                Home
            </NavLink>
            <NavLink to="/about" end>
                About
            </NavLink>
            <NavLink to="/contact" end>
                Contact
            </NavLink>
        </nav>
    );
}
