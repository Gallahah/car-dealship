import { useState } from "react";
import useMediaQuery from "@/utils/useMediaQuery";
import Logo from "@/assets/logo.png";
import CustomLink from "@/components/CustomLink";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface Props {
    isTopOfPage: boolean; // check if the scroll position is at the top of the page
}

const Navbar = ({ isTopOfPage }: Props) => {
    const flexBetween = "flex items-center justify-between";
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    // check to determine navbar design depending on the scroll position
    const navbarBackground = isTopOfPage ? "" : "drop-shadow shadow";
    const links = "transition duration-500 hover:text-purple-800";

    return <nav>
        <div className={`${flexBetween} ${navbarBackground} bg-gray-900 fixed top-0 z-30 w-full py-6`}>
            <div className={`${flexBetween} mx-auto w-5/6`}>
                <div className={`${flexBetween} gap-16 w-full`}>
                    {/* Left Side */}
                    <CustomLink to={"/"}>
                        <img alt="logo" src={Logo} className="transition duration-500 hover:-translate-y-1 w-2/6" />
                    </CustomLink>

                    {/* Right Side */}
                    {/* Check for the resolution to determine which menu to display */}
                    {isAboveMediumScreens ? (
                        <div className={`${flexBetween} gap-16 text-white w-full`}>
                            <div
                                className={`${flexBetween} gap-8 text-lg font-semibold mx-auto`}>
                                {/* LINKS */}
                                <CustomLink to="/buy" className={`${links} text-purple-900 hover:text-purple-700 font-semibold text-md text-center mr-2 mb-2`}>Buy</CustomLink>
                                <CustomLink to="/home" className={`${links} text-purple-900 hover:text-purple-700 font-semibold text-md text-center mr-2 mb-2`}>Home</CustomLink>
                                <CustomLink to="/sell" className={`${links} text-purple-900 hover:text-purple-700 font-semibold text-md text-center mr-2 mb-2`}>Sell</CustomLink>
                            </div>
                            <div
                                className={`${flexBetween} gap-4 font-semibold`}
                            >
                                <CustomLink to="/login" className={links}>Login</CustomLink>
                                <CustomLink to="/signup" className={`${links} rounded-lg hover:border-purple-600 border px-4 py-2`}>Sign Up</CustomLink>
                            </div>
                        </div>
                    ) : (
                        // Mobile menu toggle
                        <button className="rounded-t-full rounded-l-full bg-white p-2"
                                onClick={() => setIsMenuToggled(!isMenuToggled)}
                        >
                            <Bars3Icon className="h-6 w-6 text-purple-600" />
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* MOBILE MENU */}
        {!isAboveMediumScreens && isMenuToggled && (
            <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-gray-800 drop-shadow-xl text-white font-semibold border-l-2 border-purple-900">
                {/* CLOSE ICON */}
                <div className="flex justify-end p-12">
                    <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                        <XMarkIcon className="h-8 w-8 text-white border-2 rounded-md" />
                    </button>
                </div>

                {/* ITEMS/LINKS */}
                <div className="ml-[33%] flex flex-col gap-10 text-3xl mt-14 underline underline-offset-4 underline-black decoration-purple-900 decoration-2 decoration-dashed">
                    <CustomLink to="/" className={links}>Home</CustomLink>
                    <CustomLink to="/buy" className={links}>Buy</CustomLink>
                    <CustomLink to="/sell" className={links}>Sell</CustomLink>
                    <CustomLink to="/" className={`${links} font-lora font-medium`}>Sign In</CustomLink>
                    <CustomLink to="/" className={`${links} font-lora font-medium`}>Sign Up</CustomLink>
                </div>
            </div>
        )}
    </nav>;
}

export default Navbar;

