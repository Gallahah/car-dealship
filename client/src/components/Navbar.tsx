import { useState } from "react";
import useMediaQuery from "@/utils/useMediaQuery";
import Logo from "@/assets/logo.png";
import CustomLink from "@/components/CustomLink";
import { Bars3Icon } from "@heroicons/react/24/solid";
import {XMarkIcon} from "@heroicons/react/20/solid";

interface Props {
    isTopOfPage: boolean;
}

const Navbar = ({ isTopOfPage }: Props) => {
    const flexBetween = "flex items-center justify-between";
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";

    return <nav>
        <div className={`${flexBetween} ${navbarBackground} drop-shadow bg-dark-100 fixed top-0 z-30 w-full py-6`}>
            <div className={`${flexBetween} mx-auto w-5/6`}>
                <div className={`${flexBetween} gap-16 w-full`}>
                    {/* Left Side */}
                    <CustomLink to={"/"}>
                        <img alt="logo" src={Logo} className="transition duration-500 hover:-translate-y-1" />
                    </CustomLink>

                    {/* Right Side */}
                    {isAboveMediumScreens ? (
                        <div className={`${flexBetween}`}>
                            <div
                                className={`${flexBetween} gap-10 text-md font-semibold`}>
                                <CustomLink to="/">Home</CustomLink>
                                <CustomLink to="/buy">Buy</CustomLink>
                                <CustomLink to="/sell">Sell</CustomLink>
                            </div>
                        </div>
                    ) : (
                        <button className="rounded-t-full rounded-l-full bg-light-100 p-2"
                                onClick={() => setIsMenuToggled(!isMenuToggled)}
                        >
                            <Bars3Icon className="h-6 w-6 text-white" />
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* MOBILE MENU */}
        {!isAboveMediumScreens && isMenuToggled && (
            <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-light-100 drop-shadow-xl">
                {/* CLOSE ICON */}
                <div className="flex justify-end p-12">
                    <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                        <XMarkIcon className="h-8 w-8 text-white border-2 rounded-md" />
                    </button>
                </div>

                {/* ITEMS */}
                <div className="ml-[33%] flex flex-col gap-10 text-3xl">
                    <CustomLink to="/">Home</CustomLink>
                    <CustomLink to="/buy">Buy</CustomLink>
                    <CustomLink to="/sell">Sell</CustomLink>
                </div>
            </div>
        )}
    </nav>;
}

export default Navbar;

