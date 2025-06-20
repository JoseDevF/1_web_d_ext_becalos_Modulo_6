import { useRef, useEffect } from "react";

export function ScrollTracker() {
    const scrollPos = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            scrollPos.current = window.scrollY;
            console.log('Scroll actual: ', scrollPos.current);
            console.log('Window: ', window.scrollY);
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className="h-60 overflow-y-scroll border p-2">
            <div className="h-screen">

            </div>
            <div className="h-screen">

            </div>
            {/* contenido largo */}
        </div>
    )
}