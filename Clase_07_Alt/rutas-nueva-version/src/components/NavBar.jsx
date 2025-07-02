import { NavLink } from "react-router";
import { useTheme } from '../context/ThemeContext'

export function NavBar() {
    const { theme, toggleTheme } = useTheme()


    return (
        <nav
            className={`w-full px-3 py-2 flex justify-between items-center
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'}`}
        >
            <div className="flex gap-3">
                <NavLink to="/" end>
                    Home
                </NavLink>
                <NavLink to="/about" end>
                    About
                </NavLink>
                <NavLink to="/contact" end>
                    Contact
                </NavLink>
            </div>


            <div className="flex items-center gap-4">
                <button onClick={toggleTheme} className="px-2 py-1 border rounded">
                    Tema: {theme === 'light' ? '☀️' : '🌙'}
                </button>
            </div>
        </nav>
    );
}
