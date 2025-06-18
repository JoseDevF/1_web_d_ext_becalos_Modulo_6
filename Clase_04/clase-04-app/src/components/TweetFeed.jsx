import { useEffect, useState, useMemo } from "react";


export default function TweetFeed({ tweets, children }) {
    const [filtro, setFiltro] = useState('')

    const filtrados = useMemo(() =>
        tweets.filter(t => t.contenido.toLowerCase().includes(filtro.toLowerCase())))

    console.log(children)
    console.log(tweets)


    useEffect(() => {
        console.log('Tweetfeed Montado')
        return () => console.log('Tweetfeed desmontado')
    }, [])

    return (
        <div className="bg-white border-l border-r border-gray-200 max-w-2xl mx-auto">
            <div className="sticky top-0 bg-white bg-opacity-80 backdrop-blur-md border-b border-gray-200 p-4">
                <h2 className="text-xl font-bold text-gray-900">Inicio</h2>
                <input
                    type="text"
                    className="mt-3 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Buscar en Twitter"
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                />
            </div>
            <div className="divide-y divide-gray-200">
                {tweets.length === 0 ? (
                    <div>Cargando tweets…</div>
                ) : filtrados.length === 0 ? (
                    <div>No hay tweets que coincidan con "{filtro}"</div>
                ) : (
                    filtrados.map(tweet =>
                        // Aquí usamos el render-prop: children(tweet)
                        children
                            ? children(tweet)
                            : null /* o podrías renderizar un fallback */
                    )
                )}
            </div>
        </div>
    )
}