/*****************************************************************************************
 * COMPONENTE: FloatingNavbar (versión optimizada)
 * ───────────────────────────────────────────────────────────────────────────────────────
 * PRINCIPIOS DE OPTIMIZACIÓN
 *    1.  Constantes y sub-componentes fuera del cuerpo principal  ➜ sin recreación.
 *    2.  React.memo en <NavLink> evita renders innecesarios.
 *    3.  useReducedMotion ➜ respeta accesibilidad y desactiva animaciones pesadas.
 *    4.  useMotionTemplate combina alpha dinámico en un solo string rgba() (GPU-friendly).
 *    5.  Variants + stagger para animaciones más declarativas y menos código repetido.
 *****************************************************************************************/
import { useRef, useState, memo } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion,
    useMotionTemplate,
    AnimatePresence,
} from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';

/*────────────── 1) CONSTANTES FUERA DEL ÁRBOL ──────────────*/
const NAV_ITEMS = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Características', href: '#features' },
    { label: 'App', href: '#app' },
    { label: 'Contacto', href: '#contact' },
];

/*────────────── 2) LINK MEMOIZADO ──────────────*/
const NavLink = memo(({ href, children, delay = 0, prefersReducedMotion }) => (
    <motion.a
        href={href}
        className="text-white/80 hover:text-white font-medium transition-colors duration-300 relative"
        variants={{
            hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -20 },
            visible: { opacity: 1, y: 0, transition: { delay } },
        }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
    >
        {children}
        {!prefersReducedMotion && (
            <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
            />
        )}
    </motion.a>
));

/*───────────────── 3) NAVBAR ─────────────────*/
export const FloatingNavbar = () => {
    const navRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    /* 3.1 Scroll-based styling */
    const { scrollY } = useScroll();
    const alpha = useTransform(scrollY, [0, 100], [0.05, 0.15]);
    const blur = useTransform(scrollY, [0, 100], [10, 20], { clamp: false });
    const bgRGBA = useMotionTemplate`rgba(255 255 255 / ${alpha})`;
    const blurFilter = useMotionTemplate`blur(${blur}px)`;

    /* 3.2 Variants para stagger en desktop */
    const navVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
    };

    return (
        <motion.nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-50 p-4 select-none"
            initial={{ y: prefersReducedMotion ? 0 : -100, opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            {/* Contenedor con fondo dinámico */}
            <motion.div
                className="max-w-6xl mx-auto relative rounded-2xl shadow-2xl"
                style={{ backgroundColor: bgRGBA, backdropFilter: blurFilter }}
            >
                <div className="bg-white/10 rounded-2xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                            <motion.div
                                className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
                                animate={prefersReducedMotion ? {} : { rotate: [0, 360] }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            >
                                <Sparkles className="w-5 h-5 text-white" />
                            </motion.div>
                            <span className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                TaskFlow
                            </span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <motion.div
                            className="hidden md:flex items-center space-x-8"
                            variants={navVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {NAV_ITEMS.map((item, idx) => (
                                <NavLink
                                    key={item.label}
                                    href={item.href}
                                    delay={idx * 0.1}
                                    prefersReducedMotion={prefersReducedMotion}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </motion.div>

                        {/* Mobile Toggle */}
                        <motion.button
                            onClick={() => setIsOpen(o => !o)}
                            className="md:hidden w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white"
                            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </motion.button>
                    </div>

                    {/* Mobile Nav – AnimatePresence para montar/desmontar */}
                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.div
                                key="mobileNav"
                                className="md:hidden overflow-hidden"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {NAV_ITEMS.map((item, idx) => (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        className="block py-3 text-white/80 hover:text-white font-medium transition-colors duration-300"
                                        onClick={() => setIsOpen(false)}
                                        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.nav>
    );
};
