import React, { useState, useCallback } from "react"
import { useTheme } from '../context/ThemeContext'
import { useFetch } from '../hooks/useFetch'


const LikeButton = React.memo(({ onLike }) => (
    <button onClick={onLike} className="text-blue-500">💙 Like</button>
));

export function ProductCard() {
    const [likes, setLikes] = useState(0);
    const { theme } = useTheme()
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos/1')

    let algo = "algo";
    const handler = () => { }

    const handleLike = useCallback(() => setLikes(l => l + 1), []) // estable

    return (
        <>
            {
                loading ? <p>Cargando...</p> : error ? <p>Error: {error.message}</p> : <p>{JSON.stringify(data)}</p>
            }
            <div className={`${theme === 'dark' ? 'bg-blue-900' : 'bg-yellow-100'} p-4 border rounded`}>
                <p>🍕 Pizza Margarita</p>
                <LikeButton onLike={handleLike} />   {/* hijo memoizado */}
                <p>Likes: {likes}</p>
            </div>
        </>
    )
}
