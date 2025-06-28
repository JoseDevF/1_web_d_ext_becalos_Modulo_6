/*****************************************************************************************
 * COMPONENTE: FeaturesSection (versión optimizada)
 * ───────────────────────────────────────────────────────────────────────────────────────
 * PRINCIPIOS DE OPTIMIZACIÓN APLICADOS
 *    1.  Datos y componentes fuera del árbol:  FEATURES y <FeatureCard> están
 *        fuera de <FeaturesSection> -> no se crean en cada render.
 *    2.  React.memo + index-based delay -> evitamos renders y cálculos extra.
 *    3.  Accesibilidad first:  useReducedMotion desactiva efectos costosos si
 *        el usuario prefiere menos animaciones.
 *    4.  Animaciones declarativas y baratas:  sólo usamos transforms cuando
 *        aporta valor visual; hover simple en CSS si hay reducedMotion.
 *****************************************************************************************/
import { memo, useRef } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion,
} from 'framer-motion';
import { Sparkles, Zap, Target } from 'lucide-react';

/*────────────── 1) CONSTANTES FUERA DEL ÁRBOL ──────────────*/
const FEATURES = [
    {
        icon: Target,
        title: 'Enfoque Inteligente',
        description: 'Prioriza automáticamente tus tareas más importantes con IA avanzada.',
        color: 'from-purple-500 to-indigo-500',
    },
    {
        icon: Zap,
        title: 'Súper Rápido',
        description: 'Interfaz ultra-responsiva que se adapta a tu velocidad de trabajo.',
        color: 'from-pink-500 to-rose-500',
    },
    {
        icon: Sparkles,
        title: 'Experiencia Mágica',
        description: 'Animaciones fluidas y diseño que hace que organizar sea divertido.',
        color: 'from-cyan-500 to-blue-500',
    },
];

/*────────────── 2) CARD MEMOIZADA ──────────────*/
const FeatureCard = memo(
    ({ icon: Icon, title, description, color, index, prefersReducedMotion }) => {
        // Animaciones desactivadas si el usuario lo prefiere
        const base = {
            initial: { opacity: 0, y: prefersReducedMotion ? 0 : 50 },
            whileInView: { opacity: 1, y: 0 },
            transition: { delay: index * 0.15, duration: 0.6 },
            viewport: { once: true },
            whileHover: prefersReducedMotion ? {} : { y: -10 },
        };

        return (
            <motion.div className="relative group" {...base}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full group-hover:bg-white/10 transition-all duration-300">
                    <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center mb-6`}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                    >
                        <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                    <p className="text-white/70 leading-relaxed">{description}</p>
                </div>
            </motion.div>
        );
    },
);

/*────────────── 3) SECCIÓN PRINCIPAL ──────────────*/
export const FeaturesSection = () => {
    const sectionRef = useRef(null);
    const prefersReducedMotion = useReducedMotion(); // accesibilidad

    /* Parallax suave – omitido si el usuario prefiere movimiento reducido */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        prefersReducedMotion ? ['0px', '0px'] : ['100px', '-100px'],
    );
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        prefersReducedMotion ? [1, 1, 1, 1] : [0, 1, 1, 0],
    );

    return (
        <section ref={sectionRef} id="features" className="relative py-32 bg-slate-900">
            <motion.div className="max-w-6xl mx-auto px-4" style={{ y, opacity }}>
                {/* Encabezado */}
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

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {FEATURES.map((props, i) => (
                        <FeatureCard
                            key={props.title}
                            {...props}
                            index={i}
                            prefersReducedMotion={prefersReducedMotion}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
