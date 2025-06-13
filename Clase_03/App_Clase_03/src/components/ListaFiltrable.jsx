// src/components/ListaFiltrable.jsx
import React, { useState, useEffect, useMemo } from "react";

export function ListaFiltrable() {
    const [items, setItems] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [fruta, setFruta] = useState("");
    const [primeraCarga, setPrimeraCarga] = useState(true);

    // Leer de localStorage o simular petición inicial
    useEffect(() => {
        const almacen = localStorage.getItem("frutas");
        if (almacen) {
            setTimeout(() => {
                setItems(JSON.parse(almacen));
            }, 2000);
        } else {
            setTimeout(() => {
                const inicial = ["Manzana", "Banana", "Cereza", "Mora"];
                setItems(inicial);
                localStorage.setItem("frutas", JSON.stringify(inicial));
            }, 2000);
        }
    }, []);

    // Persistir en localStorage al cambiar items, pero saltando la primera vez
    useEffect(() => {
        if (primeraCarga) {
            setPrimeraCarga(false);
            return;
        }
        localStorage.setItem("frutas", JSON.stringify(items));
    }, [items, primeraCarga]);

    // Memoizar listado filtrado
    const itemsFiltrados = useMemo(
        () => {
            return items.filter((i) =>
                i.toLowerCase().includes(filtro.toLowerCase())
            )
        },
        [items, filtro]
    );

    // Añadir fruta si no existe
    const addFruta = () => {
        const nombre = fruta.trim();
        if (
            nombre &&
            !items.some((i) => i.toLowerCase() === nombre.toLowerCase())
        ) {
            setItems((prev) => [...prev, nombre]);
        }
        setFruta("");
    };

    // Quitar fruta por nombre
    const removeFruta = () => {
        const nombre = fruta.trim().toLowerCase();
        if (nombre) {
            setItems((prev) =>
                prev.filter((i) => i.toLowerCase() !== nombre)
            );
        }
        setFruta("");
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl space-y-6">
            {/* Sección de filtro */}
            <section>
                <label className="block text-gray-700 mb-1">Filtrar lista:</label>
                <input
                    type="text"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    placeholder="Escribe para filtrar…"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
            </section>

            {/* Sección de CRUD */}
            <section>
                <label className="block text-gray-700 mb-1">
                    Agregar o quitar fruta:
                </label>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={fruta}
                        onChange={(e) => setFruta(e.target.value)}
                        placeholder="Nombre de la fruta…"
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        onClick={addFruta}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Añadir
                    </button>
                    <button
                        onClick={removeFruta}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Quitar
                    </button>
                </div>
            </section>

            {/* Sección de listado */}
            <section>
                {items.length === 0 ? (
                    <p className="text-center text-gray-500">Cargando…</p>
                ) : (
                    <ul className="list-disc list-inside space-y-1">
                        {itemsFiltrados.map((item, idx) => (
                            <li
                                key={idx}
                                className="px-2 py-1 hover:bg-gray-100 rounded"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
