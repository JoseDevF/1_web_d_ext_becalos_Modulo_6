import { useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
    // Se ejecuta una sola vez en el montaje del componente que lo llame
    // Lee localStorage y parsear JSON; si no existe, uso el defaultValue
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key)
        return stored !== null ? JSON.parse(stored) : defaultValue
    })

    // Sincronización: Cada vez que 'key' o 'value' cambien, actualiza localStorage
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    // Devolviendo el valor y la función para cambiar dicho valor
    // Se usa exactamente igual que useState
    return [value, setValue];
}