import { FloatingNavbar } from "./FloatingNavbar";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import AnimatedTodo from "./AnimatedTodo";

// Componente principal que integra todo
export default function LandingPage() {
    return (
        <div className="relative">
            <FloatingNavbar />
            <HeroSection />
            <FeaturesSection />

            {/* Sección placeholder para la app */}
            <section id="app" className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <AnimatedTodo />
            </section>
        </div>
    );
}