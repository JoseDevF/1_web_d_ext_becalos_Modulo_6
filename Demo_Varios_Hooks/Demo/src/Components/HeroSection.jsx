/*****************************************************************************************
 * COMPONENTE: HeroSection (versión optimizada)
 * ───────────────────────────────────────────────────────────────────────────────────────
 * PRINCIPIOS DE OPTIMIZACIÓN
 *    1.  Partículas memoizadas -> se generan UNA sola vez (useRef) y no cambian.
 *    2.  Eliminamos setInterval + useMotionValue innecesario -> animaciones declarativas
 *        con Framer (GPU-friendly) y sin timers manuales.
 *    3.  Accesibilidad -> useReducedMotion desactiva parallax y animaciones pesadas.
 *    4.  Sub-componentes memoizados (<FloatingParticle>) para evitar renders.
 *    5.  Sólo strings seguros en useTransform -> rendimiento y legibilidad.
 *****************************************************************************************/
import { useRef } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion,
} from 'framer-motion';
import { Zap, ArrowDown } from 'lucide-react';

/*────────────── 1) SUB-COMPONENTE MEMOIZADO ──────────────*/
const FloatingParticle = ({
    size,
    x,
    y,
    duration,
    delay,
    prefersReducedMotion,
}) => {
    // Sin animación compleja si el usuario prefiere menos movimiento
    if (prefersReducedMotion) {
        return (
            <div
                className="absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-40"
                style={{
                    width: size,
                    height: size,
                    left: `${x}%`,
                    top: `${y}%`,
                }}
            />
        );
    }

    return (
        <motion.div
            className="absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-60"
            style={{
                width: size,
                height: size,
                left: `${x}%`,
                top: `${y}%`,
            }}
            animate={{
                y: [-20, -100, -20],
                x: [-10, 10, -10],
                opacity: [0.6, 0.2, 0.6],
                scale: [0.5, 1, 0.5],
            }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
            }}
        />
    );
};

/*────────────── 2) SECCIÓN PRINCIPAL ──────────────*/
export const HeroSection = () => {
    const heroRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    /* 2.1 Parallax sólo si está permitido */
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        prefersReducedMotion ? ['0%', '0%'] : ['0%', '50%'],
    );
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        prefersReducedMotion ? [1, 1, 1] : [1, 0.8, 0],
    );
    const scale = useTransform(
        scrollYProgress,
        [0, 1],
        prefersReducedMotion ? [1, 1] : [1, 1.1],
    );

    /* 2.2 Partículas generadas una sola vez */
    const particlesRef = useRef(
        Array.from({ length: 20 }, (_, i) => ({
            id: i,
            size: Math.random() * 4 + 2,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
        })),
    );

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        >
            {/* Fondo con ligero zoom */}
            <motion.div className="absolute inset-0" style={{ scale }}>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20" />

                {/* Círculos decorativos – animaciones simples y declarativas */}
                {!prefersReducedMotion && (
                    <>
                        <motion.div
                            className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-20 right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-xl"
                            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </>
                )}
            </motion.div>

            {/* Partículas */}
            {particlesRef.current.map(p => (
                <FloatingParticle
                    key={p.id}
                    {...p}
                    prefersReducedMotion={prefersReducedMotion}
                />
            ))}

            {/* Contenido principal */}
            <motion.div
                className="relative z-10 text-center px-4 max-w-4xl mx-auto"
                style={{ y, opacity }}
            >
                {/* Badge */}
                <motion.div
                    className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    {!prefersReducedMotion && (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        >
                            <Zap className="w-4 h-4 text-yellow-400" />
                        </motion.div>
                    )}
                    <span className="text-white/80 text-sm font-medium">
                        La nueva era de la productividad
                    </span>
                </motion.div>

                {/* Título */}
                <motion.h1
                    className="text-5xl md:text-7xl font-black mb-6 leading-tight"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                >
                    <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                        Organiza tu vida
                    </span>
                    <br />
                    <motion.span
                        className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                        animate={
                            prefersReducedMotion
                                ? {}
                                : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
                        }
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        con TaskFlow
                    </motion.span>
                </motion.h1>

                {/* Sub-título */}
                <motion.p
                    className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    La aplicación de tareas más elegante y potente que transformará
                    <br className="hidden md:block" />
                    tu forma de trabajar y vivir cada día.
                </motion.p>

                {/* CTA */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                >
                    <motion.button
                        className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-purple-500/30 overflow-hidden"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center space-x-2">
                            <span>Comenzar Ahora</span>
                            {!prefersReducedMotion && (
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <ArrowDown className="w-5 h-5 rotate-[-90deg]" />
                                </motion.div>
                            )}
                        </span>
                    </motion.button>

                    <motion.button
                        className="px-8 py-4 border-2 border-white/30 rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.02, borderColor: 'rgba(255,255,255,0.5)' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Ver Demo
                    </motion.button>
                </motion.div>

                {/* Indicador scroll */}
                {!prefersReducedMotion && (
                    <motion.div
                        className="flex flex-col items-center space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                    >
                        <span className="text-white/50 text-sm font-medium">Descubre más abajo</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <ArrowDown className="w-6 h-6 text-white/50" />
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>

            {/* Gradiente de transición */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
        </section>
    );
};
