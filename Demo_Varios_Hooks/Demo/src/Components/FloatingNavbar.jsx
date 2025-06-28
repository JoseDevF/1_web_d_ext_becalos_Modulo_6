import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';

// Componente de navegación flotante
export const FloatingNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);
    const { scrollY } = useScroll();

    // Transformaciones basadas en scroll
    const navBackground = useTransform(
        scrollY,
        [0, 100],
        ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.15)']
    );

    const navBlur = useTransform(
        scrollY,
        [0, 100],
        ['blur(10px)', 'blur(20px)']
    );

    const navItems = [
        { label: 'Inicio', href: '#hero' },
        { label: 'Características', href: '#features' },
        { label: 'App', href: '#app' },
        { label: 'Contacto', href: '#contact' }
    ];

    return (
        <motion.nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-50 p-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <motion.div
                className="max-w-6xl mx-auto relative"
                style={{
                    backgroundColor: navBackground,
                    backdropFilter: navBlur,
                }}
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.div
                            className="flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            >
                                <Sparkles className="w-5 h-5 text-white" />
                            </motion.div>
                            <span className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                TaskFlow
                            </span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    className="text-white/80 hover:text-white font-medium transition-colors duration-300 relative"
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                >
                                    {item.label}
                                    <motion.div
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </motion.button>
                    </div>

                    {/* Mobile Navigation */}
                    <motion.div
                        className="md:hidden overflow-hidden"
                        initial={{ height: 0 }}
                        animate={{ height: isOpen ? 'auto' : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="pt-4 border-t border-white/10 mt-4">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    className="block py-3 text-white/80 hover:text-white font-medium transition-colors duration-300"
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.nav>
    );
};