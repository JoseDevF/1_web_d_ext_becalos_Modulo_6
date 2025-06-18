import { useState, useEffect } from "react";

export function TweetCard({ usuario, contenido, className }) {
    const [likes, setLikes] = useState(0);
    const [showCard, setShowCard] = useState(true)

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

    function handleShowButton() {
        setShowCard(prev => !prev)
    }

    useEffect(() => { console.log("useEffect del Show Card") }, [showCard])

    return (
        <>
            <button className="btn" onClick={handleShowButton}></button>
            <div className={`${showCard === true ? "block" : "hidden"} max-w-md mx-auto my-4 p-4 bg-white shadow-md rounded-lg`}>
                <h3 className="font-bold text-lg">@{usuario}</h3>
                <p className="mt-2 text-gray-700">{contenido}</p>
                <button
                    className={className}
                    onClick={handleLikeButton}
                >
                    ❤️ {likes}
                </button>
            </div>
        </>
    )
}