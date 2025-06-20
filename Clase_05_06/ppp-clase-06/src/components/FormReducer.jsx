import { useReducer } from "react";
const initialForm = { nombre: '', email: '', erro: '' }

function formReducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value, erro: '' };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'RESET':
            return initialForm;
        default:
            return state;
    }
}

export function FormReducer() {
    const [state, dispatch] = useReducer(formReducer, initialForm)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!state.nombre || !state.email) {
            dispatch({ type: 'SET_ERROR', payload: 'Todos los campos son obligatorios' })
        } else {
            alert(`Enviado: ${state.nombre} - ${state.email}`)
            dispatch({ type: 'RESET' })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white shadow rounded space-y-4">
            {state.error && <p className="text-red-500">{state.error}</p>}
            <input
                type="text"
                placeholder="Nombre"
                value={state.nombre}
                onChange={e => dispatch({ type: 'SET_FIELD', field: 'nombre', value: e.target.value })}
                className="w-full px-3 py-2 border rounded"
            />
            <input
                type="email"
                placeholder="Email"
                value={state.email}
                onChange={e => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
                className="w-full px-3 py-2 border rounded"
            />
            <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Enviar
            </button>
        </form>
    )
}