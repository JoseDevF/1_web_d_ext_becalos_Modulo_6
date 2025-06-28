import { useState, useReducer } from "react"

const initialCart = { items: [], total: 0, envio: false, cupon: false };

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return {
                items: [...state.items, action.item],
                total: state.total + action.item.price,
                envio: state.total > 299 ? true : false
            };
        case 'REMOVE':
            return {
                items: state.items.filter(i => i.id !== action.id),
                total: state.total - action.price,
                envio: state.envio
            };
        case 'FULL':
            return {
                items: [...state.items],
                total: state.total,
                envio: true
            };
        case 'CLEAR':
            return initialCart;
        default:
            return state;
    }
}


export function Cart() {

    const [cart, dispatch] = useReducer(cartReducer, initialCart)


    const add = p => dispatch({ type: 'ADD', item: p });
    const remove = p => dispatch({ type: 'REMOVE', id: p.id, price: p.price });


    /*const [listadoCompras, setListadoCompras] = useState([])
    const [total, setTotal] = useState(0)
    const [envio, setEnvio] = useState(false)
    const [cupon, setCupon] = useState(false) 
    */


    return (
        <>
            <div className="p-4 space-y-2">
                <button onClick={() => add({ id: 1, name: 'Libro', price: 10 })}>
                    Añadir Libro
                </button>
                <ul>
                    {cart.items.map(it => (
                        <li key={it.id} className="flex justify-between">
                            {it.name} – ${it.price}
                            <button onClick={() => remove(it)} className="text-red-500">&times;</button>
                        </li>
                    ))}
                </ul>
                <p className="font-bold">Total: ${cart.total}</p>
            </div>
        </>
    )
}