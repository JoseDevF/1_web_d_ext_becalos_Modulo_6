import { useState, useEffect } from "react";

export function TweetCard({ usuario, contenido }) {
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        //Petición a la API para saber cuantos likes hay
        console.log(`Se monto la Tweetcard de ${usuario}`)
        return () => {
            console.log(`Se desmonto la Tweetcard de ${usuario}`)
        }
    }, [])

    function handleLikeButton() {
        setLikes(prev => prev + 1);
    }

    return (
        <>
            <div className="max-w-md mx-auto my-4 p-4 bg-white shadow-md rounded-lg">
                <h3 className="font-bold text-lg">@{usuario}</h3>
                <p className="mt-2 text-gray-700">{contenido}</p>
                <button
                    className="mt-4 inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleLikeButton}
                >
                    ❤️ {likes}
                </button>
            </div>
        </>
    )
}