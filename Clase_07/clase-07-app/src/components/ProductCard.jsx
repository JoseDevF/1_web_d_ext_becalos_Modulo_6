import React, { useState, useCallback } from "react"

const LikeButton = React.memo(({ onLike }) => (
    <button onClick={onLike} className="text-blue-500">💙 Like</button>
));

export function ProductCard() {
    const [likes, setLikes] = useState(0);

    let algo = "algo";
    const handler = () => { }

    const handleLike = useCallback(() => setLikes(l => l + 1), []) // estable

    return (
        <>
            <div className="p-4 border rounded">
                <p>🍕 Pizza Margarita</p>
                <LikeButton onLike={handleLike} />   {/* hijo memoizado */}
                <p>Likes: {likes}</p>
            </div>
        </>
    )
}