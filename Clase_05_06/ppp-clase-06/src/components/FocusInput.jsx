import { useRef, useEffect } from "react";

export function FocusInput() {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();// el elemento <input> recibe el foco al montar
    }, []);

    return (
        <>
            <input
                ref={inputRef}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Foco automático"
            />
        </>
    )
}