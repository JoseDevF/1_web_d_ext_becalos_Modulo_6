function Tarjeta({ titulo, descripcion }) {
    return (
        <>
            <div className="max-w-sm p-4 m-2 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold text-black">{titulo}</h3>
                <p className="mt-1 text-gray-600">{descripcion}</p>
            </div>
        </>
    )
}

export default Tarjeta;