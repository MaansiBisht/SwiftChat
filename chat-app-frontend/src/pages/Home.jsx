import Hero from "../components/Hero";
import { useAuth } from "../context/authContext";
import LandingNav from "../components/LandingNav";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Payments from "../components/Payments";
import CustomerLogos from "../components/CustomerLogos";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
    const { isAuthenticated } = useAuth();
    const { mode } = useTheme();

    // Theme-aware background
    const bgMain = mode === "dark" ? "bg-gray-900" : "bg-[#F6F9FE]";

    return (
        <div className={`${bgMain} min-h-screen font-sans`}>
            <LandingNav />
            <Hero />
            <Features />
            <Payments />
            {/* <CustomerLogos /> */}
            <Footer />
        </div>
    );
};

export default Home;
