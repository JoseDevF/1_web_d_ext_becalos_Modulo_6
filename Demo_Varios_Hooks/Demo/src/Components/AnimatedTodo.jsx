import React, {
    useReducer,
    useState,
    useRef,
    useEffect,
    useCallback,
    useMemo
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Check,
    X,
    Sparkles,
    Circle,
    CheckCircle2
} from 'lucide-react';

// 1) Reducer puro para manejar la lógica de CRUD de los todos.
//    useReducer es ideal aquí porque tenemos varias acciones y queremos centralizar la lógica.
function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [
                { id: action.id, text: action.text, done: false },
                ...state
            ];
        case 'TOGGLE':
            return state.map(t =>
                t.id === action.id ? { ...t, done: !t.done } : t
            );
        case 'REMOVE':
            return state.filter(t => t.id !== action.id);
        default:
            throw new Error(`Acción desconocida: ${action.type}`);
    }
}

// 2) Constante fuera del componente para evitar recrearla en cada render.
const FILTER_OPTIONS = [
    { key: 'all', label: 'Todo', icon: Sparkles },
    { key: 'active', label: 'Activo', icon: Circle },
    { key: 'completed', label: 'Hecho', icon: CheckCircle2 }
];

// 3) Componente memoizado para las partículas.
//    React.memo evita renders extra cuando no cambian las props.
const FloatingParticle = React.memo(({ delay = 0 }) => (
    <motion.div
        className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
        animate={{
            y: [-20, -80, -20],
            x: [-10, 10, -10],
            opacity: [0.6, 0.2, 0.6],
            scale: [0.5, 1, 0.5]
        }}
        transition={{
            duration: 3,
            repeat: Infinity,
            delay,
            ease: 'easeInOut'
        }}
        style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
        }}
    />
));

export default function AnimatedTodo() {
    // ==== Manejo de estados ====
    // useReducer para la lista de tareas (más escalable que múltiples useState para operaciones CRUD).
    const [todos, dispatch] = useReducer(todoReducer, []);

    // useState para el filtro actual y para controlar el estilo del input.
    const [filter, setFilter] = useState('all');
    const [inputFocused, setInputFocused] = useState(false);

    // useRef para acceder de forma directa al <input> sin re-renderizar el componente.
    const inputRef = useRef(null);

    // Al montar, ponemos el foco en el input (solo una vez).
    useEffect(() => {
        inputRef.current?.focus();
    }, []); // [] indica que solo corre al montar.

    // ==== Callbacks memoizados ====
    // useCallback memoriza la función hasta que cambien sus dependencias,
    // evitando que se recreen en cada render y provoquen renders innecesarios en hijos.
    const addTodo = useCallback(
        e => {
            e.preventDefault();
            const text = inputRef.current.value.trim();
            if (!text) return;
            dispatch({ type: 'ADD', id: Date.now(), text });
            inputRef.current.value = '';
        },
        [] // dispatch e inputRef son estables, así que no necesitamos ponerlos aquí.
    );

    const toggleTodo = useCallback(
        id => dispatch({ type: 'TOGGLE', id }),
        []
    );
    const removeTodo = useCallback(
        id => dispatch({ type: 'REMOVE', id }),
        []
    );

    // ==== Cálculos derivados con useMemo ====
    // Para evitar filtrar y contar en cada render, los memorizamos
    // y solo se recalculan cuando cambian 'todos' o 'filter'.
    const { filteredTodos, remaining, completed } = useMemo(() => {
        const remaining = todos.filter(t => !t.done).length;
        const completed = todos.length - remaining;

        let filteredTodos = todos;
        if (filter === 'active') {
            filteredTodos = todos.filter(t => !t.done);
        } else if (filter === 'completed') {
            filteredTodos = todos.filter(t => t.done);
        }

        return { filteredTodos, remaining, completed };
    }, [todos, filter]);

    return (
        <div className="min-h-screen bg-transparent flex items-center justify-center p-4 relative overflow-hidden">
            {/* Partículas animadas */}
            {[...Array(12)].map((_, i) => (
                <FloatingParticle key={i} delay={i * 0.5} />
            ))}

            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 backdrop-blur-3xl"></div>

            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-lg"
            >
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                    {/* Título animado */}
                    <motion.div
                        className="relative z-10 text-center mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <motion.h1
                            className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2"
                            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            ✨ TaskFlow
                        </motion.h1>
                        <p className="text-white/70 text-sm font-medium">
                            Organiza tu mundo con estilo
                        </p>
                    </motion.div>

                    {/* Formulario de entrada */}
                    <motion.form
                        onSubmit={addTodo}
                        className="relative mb-8"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <div
                            className={`relative bg-white/5 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ${inputFocused
                                ? 'border-purple-400/50 shadow-lg shadow-purple-500/20'
                                : 'border-white/10'
                                }`}
                        >
                            <input
                                ref={inputRef}
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setInputFocused(false)}
                                className="w-full px-6 py-4 bg-transparent text-white placeholder-white/50 focus:outline-none text-lg font-medium"
                                placeholder="¿Qué quieres lograr hoy?"
                            />
                            <motion.button
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Plus className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.form>

                    {/* Botones de filtro */}
                    <motion.div
                        className="flex justify-center gap-3 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        {FILTER_OPTIONS.map(({ key, label, icon: Icon }) => (
                            <motion.button
                                key={key}
                                onClick={() => setFilter(key)}
                                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${filter === key
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                                    }`}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                                {filter === key && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-30"
                                        layoutId="activeFilter"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Lista de tareas */}
                    <div className="space-y-3 mb-8 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                        <AnimatePresence mode="popLayout">
                            {filteredTodos.map((todo, index) => (
                                <motion.div
                                    key={todo.id}
                                    layout
                                    initial={{ opacity: 0, x: -100, rotateX: -10 }}
                                    animate={{ opacity: 1, x: 0, rotateX: 0 }}
                                    exit={{
                                        opacity: 0,
                                        x: 100,
                                        scale: 0.8,
                                        rotateX: 10,
                                        transition: { duration: 0.3 }
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.05,
                                        type: 'spring',
                                        stiffness: 100
                                    }}
                                    className="group relative"
                                >
                                    {/* Card de cada todo */}
                                    <div
                                        className={`relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20 ${todo.done ? 'opacity-60' : ''
                                            }`}
                                    >
                                        {todo.done && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                            />
                                        )}
                                        <div className="relative flex items-center justify-between">
                                            <div className="flex items-center gap-4 flex-1">
                                                <motion.button
                                                    onClick={() => toggleTodo(todo.id)}
                                                    className={`relative flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 ${todo.done
                                                        ? 'bg-gradient-to-r from-green-400 to-emerald-400 border-green-400'
                                                        : 'border-white/30 hover:border-purple-400'
                                                        }`}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <AnimatePresence>
                                                        {todo.done && (
                                                            <motion.div
                                                                initial={{ scale: 0, opacity: 0 }}
                                                                animate={{ scale: 1, opacity: 1 }}
                                                                exit={{ scale: 0, opacity: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="absolute inset-0 flex items-center justify-center"
                                                            >
                                                                <Check className="w-4 h-4 text-white" />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.button>

                                                <motion.span
                                                    className={`text-lg font-medium transition-all duration-300 ${todo.done
                                                        ? 'line-through text-white/50'
                                                        : 'text-white'
                                                        }`}
                                                    layout
                                                >
                                                    {todo.text}
                                                </motion.span>
                                            </div>

                                            <motion.button
                                                onClick={() => removeTodo(todo.id)}
                                                className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                                                whileHover={{ scale: 1.1, rotate: 90 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <X className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredTodos.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-12"
                            >
                                <div className="text-6xl mb-4">🌟</div>
                                <p className="text-white/60 text-lg font-medium">
                                    {filter === 'completed'
                                        ? '¡Aún no has completado ninguna tarea!'
                                        : filter === 'active'
                                            ? '¡No hay tareas pendientes!'
                                            : '¡Comienza agregando tu primera tarea!'}
                                </p>
                            </motion.div>
                        )}
                    </div>

                    {/* Estadísticas */}
                    <motion.div
                        className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <div className="flex justify-between items-center">
                            {/* Pendientes */}
                            <div className="text-center">
                                <motion.div
                                    className="text-3xl font-black text-purple-400"
                                    key={remaining}
                                    initial={{ scale: 1.2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {remaining}
                                </motion.div>
                                <div className="text-white/70 text-sm font-medium">
                                    Pendientes
                                </div>
                            </div>

                            <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

                            {/* Completadas */}
                            <div className="text-center">
                                <motion.div
                                    className="text-3xl font-black text-emerald-400"
                                    key={completed}
                                    initial={{ scale: 1.2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {completed}
                                </motion.div>
                                <div className="text-white/70 text-sm font-medium">
                                    Completadas
                                </div>
                            </div>
                        </div>

                        {/* Barra de progreso */}
                        <div className="mt-4 bg-white/10 rounded-full h-2 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-purple-500 to-emerald-500"
                                initial={{ width: 0 }}
                                animate={{
                                    width:
                                        todos.length > 0
                                            ? `${(completed / todos.length) * 100}%`
                                            : '0%'
                                }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
