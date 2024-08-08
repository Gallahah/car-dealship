import { useEffect, useState } from "react";
import useMediaQuery from "@/utils/useMediaQuery";
import Logo from "@/assets/logo_dark.png";
import CustomLink from "@/components/CustomLink";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

interface Props {
    isTopOfPage: boolean; // check if the scroll position is at the top of the page
    firstName: string;  // receive the first name as a prop
}

const Navbar = ({ isTopOfPage, firstName }: Props) => {
    const flexBetween = "flex items-center justify-between";
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    // check to determine navbar design depending on the scroll position
    const navbarBackground = isTopOfPage ? "" : "drop-shadow shadow";
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Retrieved token:", token);
        setIsLoggedIn(!!token);

    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("Token removed from localStorage");
        setIsLoggedIn(false);
    };


    return <nav>
        <div className={`${flexBetween} ${navbarBackground} bg-light-20 fixed top-0 z-30 w-full py-6`}>
            <div className={`${flexBetween} mx-auto w-5/6`}>
                <div className={`${flexBetween} gap-16 w-full`}>
                    {/* Left Side */}
                    <CustomLink to={"/"}>
                        <img alt="logo" src={Logo} className="transition duration-300 hover:opacity-60 w-[40%]" />
                    </CustomLink>

                    {/* Right Side */}
                    {/* Check for the resolution to determine which menu to display */}
                    {isAboveMediumScreens ? (
                        <div className={`${flexBetween} text-black w-full`}>
                            <div
                                className={`${flexBetween} gap-8 text-md font-semibold mx-auto text-black`}>
                                {/* LINKS */}
                                <CustomLink to="/home"><h3 className="hover:text-dark-100">Home</h3></CustomLink>
                                <CustomLink to="/buy"><h3 className="hover:text-dark-100">Cars For Sale</h3></CustomLink>
                                <CustomLink to="/sell"><h3 className="hover:text-dark-100">Sell Your Car</h3></CustomLink>
                            </div>
                            {isLoggedIn ? (
                            <>
                                <div className={`${flexBetween} gap-4 font-semibold`}>
                                    <CustomLink to="/home">Welcome, {firstName}</CustomLink>
                                    <CustomLink to="/">
                                        <button onClick={handleLogout}>Logout</button>
                                    </CustomLink>
                                </div>
                            </>
                            ) : (
                                <div
                                    className={`${flexBetween} gap-4 font-semibold`}
                                >
                                    <CustomLink to="/login">
                                        <span className="hover:text-dark-200">Sign In</span>
                                    </CustomLink>
                                    <CustomLink to="/signup">
                                        <span
                                            className={`rounded-full hover:border-dark-200 hover:text-dark-200 border-2 px-4 py-2`}>
                                            Sign Up
                                        </span>
                                    </CustomLink>
                                </div>)}
                        </div>
                    ) : (
                        // Mobile menu toggle
                        <button className="rounded-xl bg-white p-2"
                                onClick={() => setIsMenuToggled(!isMenuToggled)}
                        >
                            <Bars3Icon className="h-6 w-6 text-dark-200" />
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* MOBILE MENU */}
        {!isAboveMediumScreens && isMenuToggled && (
            <motion.div
                className="fixed right-0 bottom-0 top-0 z-40 h-full w-[75%] bg-gray-200 text-gray-900 font-semibold"
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {/* CLOSE ICON */}
                <div className="flex justify-end p-12">
                    <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                        <XMarkIcon className="h-8 w-8 text-gray-900" />
                    </button>
                </div>

                {/* ITEMS/LINKS */}
                <div className="ml-[33%] flex flex-col gap-10 text-3xl mt-14">
                    <CustomLink to="/">
                        <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                            Home
                        </button>
                    </CustomLink>
                    <CustomLink to="/buy">
                        <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                            Buy
                        </button>
                    </CustomLink>
                    <CustomLink to="/sell">
                        <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                            Sell
                        </button>
                    </CustomLink>
                    <div className="mt-2 space-y-6">
                        <CustomLink to="/login">
                            <span className={`font-lora font-medium`}>
                                <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                                    Login
                                </button>
                            </span>
                        </CustomLink>
                        <CustomLink to="/signup">
                            <span className={`font-lora font-medium`}>
                                <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                                    Sign Up
                                </button>
                            </span>
                        </CustomLink>
                    </div>
                </div>
            </motion.div>
        )}
    </nav>;
}

export default Navbar;

