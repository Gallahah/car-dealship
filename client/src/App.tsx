import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Buy from "@/pages/Buy";
import Sell from "@/pages/Sell";
import Car from "@/pages/Car";
import SignUp from "@/pages/SignUp.tsx";
import Login from "@/pages/Login.tsx";
import UserProfile from "@/pages/UserProfile.tsx";
import NotFound from "@/pages/NotFound.tsx";
import { UserContextProvider } from "@/context/userContext.tsx";

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

    return <div className="app bg-white">
        <UserContextProvider>
            <Navbar isTopOfPage={isTopOfPage} />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/buy" element={<Buy />} />
                    <Route path="/sell" element={<Sell />} />
                    <Route path="/car/:id" element={<Car />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<UserProfile />}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </UserContextProvider>
    </div>

}

export default App
