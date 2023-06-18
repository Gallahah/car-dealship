import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Buy from "@/pages/Buy";
import Sell from "@/pages/Sell";
import Car from "@/pages/Car";
import NotFound from "@/pages/NotFound.tsx";

function App() {
    const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

    // Check scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsTopOfPage(true);
            }
            else setIsTopOfPage(false);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <div className="app bg-primary-100">
            <Navbar isTopOfPage={isTopOfPage}/>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/buy" element={<Buy />} />
                    <Route path="/sell" element={<Sell />} />
                    <Route path="/car/:id" element={<Car />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
    </div>

}

export default App
