// components/TweetComposer.jsx
import React, { useState, useEffect, useCallback } from 'react';

export default function TweetComposer({ onPublicar }) {
    const [texto, setTexto] = useState('');

    useEffect(() => {
        console.log('TweetComposer montado');
        return () => console.log('TweetComposer desmontado');
    }, []);

    useEffect(() => {
        if (texto) console.log('Guardando borrador:', texto);
    }, [texto]);

    const handlePublicar = useCallback(() => {
        if (!texto.trim()) return;
        onPublicar(texto.trim());
        setTexto('');
        console.log('Borrador limpiado después de publicar');
    }, [texto, onPublicar]);

    const restantes = 280 - texto.length;

    return (
        <div className="border-b border-gray-200 p-4 bg-white">
            <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">T</span>
                </div>
                <div className="flex-1">
                    <textarea
                        className="w-full min-h-[120px] text-xl placeholder-gray-500 resize-none border-none outline-none bg-transparent"
                        placeholder="¿Qué está pasando?"
                        value={texto}
                        onChange={e => setTexto(e.target.value)}
                        maxLength={280}
                    />
                    <div className="flex items-center justify-between mt-3 pt-3">
                        {/* Aquí puedes extraer botones de media si lo deseas */}
                        <div className="flex items-center space-x-3">
                            {texto && (
                                <span className={`text-sm ${restantes < 0 ? 'text-red-500' : 'text-gray-500'}`}>{restantes}</span>
                            )}
                            <button
                                onClick={handlePublicar}
                                disabled={!texto.trim() || restantes < 0}
                                className="px-6 py-1.5 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Postear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
