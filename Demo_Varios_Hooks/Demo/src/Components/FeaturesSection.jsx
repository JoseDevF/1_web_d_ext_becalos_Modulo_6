import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Zap, Target } from 'lucide-react';

// Sección de características
export const FeaturesSection = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ['100px', '-100px']);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    const features = [
        {
            icon: Target,
            title: 'Enfoque Inteligente',
            description: 'Prioriza automáticamente tus tareas más importantes con IA avanzada.',
            color: 'from-purple-500 to-indigo-500'
        },
        {
            icon: Zap,
            title: 'Súper Rápido',
            description: 'Interfaz ultra-responsiva que se adapta a tu velocidad de trabajo.',
            color: 'from-pink-500 to-rose-500'
        },
        {
            icon: Sparkles,
            title: 'Experiencia Mágica',
            description: 'Animaciones fluidas y diseño que hace que organizar sea divertido.',
            color: 'from-cyan-500 to-blue-500'
        }
    ];

    return (
        <section
            ref={sectionRef}
            id="features"
            className="relative py-32 bg-slate-900"
        >
            <motion.div
                className="max-w-6xl mx-auto px-4"
                style={{ y, opacity }}
            >
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-black mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Características Increíbles
                        </span>
                    </motion.h2>
                    <motion.p
                        className="text-xl text-white/70 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Descubre todo lo que TaskFlow puede hacer por ti
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="relative group"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full group-hover:bg-white/10 transition-all duration-300">
                                <motion.div
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    <feature.icon className="w-8 h-8 text-white" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-white/70 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
