import CustomLink from "@/components/CustomLink";
import HeroBackground from "@/assets/HeroBackgroundImage.jpg";
import TabsContainer from "@/components/TabsContainer.tsx";
import CarIcon from "@/assets/car-svgrepo-com.svg";
import HourglassIcon from "@/assets/hour-clock-svgrepo-com.svg";
import DealIcon from "@/assets/shaking-hands-svgrepo-com.svg";
import CarPros from "@/assets/car-pros.jpg";
import CarProsProcess from "@/assets/car-pros-process.jpg";
import CarProsPricing from "@/assets/car-pros-pricing.jpg";
import CarProsCustomer from "@/assets/car-pros-customer.jpg";

const Home = () => {
    return <section id="home" className="gap-16 py-10 md:pb-0">
        <div className="items-center mt-10">
            <div className="overflow-hidden w-full md:h-96 h-64 brightness-90">
                <img alt="Car Image" src={HeroBackground} className="fixed object-cover w-full h-full object-[50%_60%]" />
                <div className="relative text-center pt-10">
                    <h2 className="text-black text-4xl">Your Journey Begins Here!</h2>
                    <CustomLink to="/Buy">
                        <button className="mt-4 p-4 mx-auto items-center flex justify-center
                        before:ease relative overflow-hidden border-b-4 border-r-2 border-dark-100
                        text-dark-100 font-semibold
                        shadow-xl transition-all before:absolute before:top-1/4 before:h-0 before:w-96
                        before:origin-center before:-translate-x-4 before:rotate-45 before:bg-dark-100
                        before:duration-500 hover:text-white rounded-xl hover:before:h-64
                        hover:border-b-light-20 hover:border-r-light-20
                        hover:before:-translate-y-32 z-10">
                            <span className="z-10 relative">Search for your car</span>
                        </button>
                    </CustomLink>
                </div>
            </div>
            <div>
                <div>
                    <TabsContainer />
                </div>
            </div>
        </div>
        <div className="bg-dark-100 w-full mt-12 px-12 py-20 text-gray-800">
            <div className="flex flex-col justify-between items-center">
                <h2 className="text-4xl font-semibold">How it works.</h2>
                <div className="grid md:grid-cols-3 max-md:grid-cols-1 gap-16 mt-12">
                    <CustomLink to="/Buy">
                        <div className="text-center flex flex-col items-center space-y-4">
                            <img src={CarIcon} alt="Car Icon" className="w-1/4 drop-shadow-lg" />
                            <h3 className="font-semibold text-xl">Choose your car.</h3>
                            <p className="font-medium text-md">
                                Browse our large selection of vehicles available for test drive.
                            </p>
                        </div>
                    </CustomLink>
                    <CustomLink to="/Buy">
                        <div className="text-center flex flex-col items-center space-y-4">
                            <img src={HourglassIcon} alt="Hourglass Icon" className="w-1/4 drop-shadow-lg" />
                            <h3 className="font-semibold text-xl">Test it for 3 days.</h3>
                            <p className="font-medium text-md">
                                Rent the car for up to 3 days at a special rate
                                or take a complimentary 2-hour test drive.
                            </p>
                        </div>
                    </CustomLink>
                    <CustomLink to="/Buy">
                        <div className="text-center flex flex-col items-center space-y-4">
                            <img src={DealIcon} alt="Deal Icon" className="w-1/4 drop-shadow-lg" />
                            <h3 className="font-semibold text-xl">Make it yours.</h3>
                            <p className="font-medium text-md">
                                Buy the car and we'll waive the rental charges.
                            </p>
                        </div>
                    </CustomLink>
                </div>
                <div className="mt-12 font-semibold text-2xl text-center">
                    <h2>
                        Try before you buy. Three days to try and zero pressure to buy.
                    </h2>
                    <CustomLink to="/Buy">
                        <button className="py-3 px-5 mt-8 border-4 rounded-2xl text-white hover:bg-light-20
                         hover:border-light-20 hover:text-dark-100 transition duratio-300 drop-shadow">
                            <span>
                                Get started
                            </span>
                        </button>
                    </CustomLink>
                </div>
            </div>
        </div>
        <div className="bg-gray-200 w-full p-4">
            <div className="my-8">
                <h3 className="text-center font-semibold text-xl text-gray-800">Find a Dealership Near You</h3>
                <div className="flex flex-col gap-10 justify-center">
                    <form className="font-medium flex justify-center items-center gap-4 m-8">
                        <input type="text" placeholder="Find a Dealership Near You" className="rounded-lg w-1/2 text-black text-sm py-2 px-4" />
                        <input type="submit" name="submit" value="Search" disabled className="cursor-pointer text-gray-800 font-medium" />
                    </form>
                </div>
            </div>
        </div>
        <div className="bg-dark-100 w-full py-20">
            <div className="flex flex-col gap-10 justify-center items-center text-gray-800">
                <h2 className="text-4xl font-semibold mb-4 text-light-20">
                    Why buy from us?
                </h2>
                <div className="grid md:grid-cols-4 max-md:grid-cols-1 gap-8 items-center justify-between font-semibold">
                    <div className="flex flex-col items-center space-y-4">
                        <img src={CarPros} alt="cars in a row" className="rounded-3xl w-[250px]" />
                        <h2>Extensive Selection.</h2>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <img src={CarProsPricing} alt="a car consultant with a customer" className="rounded-3xl w-[280px]" />
                        <h2>Transparent Pricing.</h2>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <img src={CarProsProcess} alt="car keys" className="rounded-3xl w-[280px]" />
                        <h2>Hassle-Free Process.</h2>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <img src={CarProsCustomer} alt="happy person in a car" className="rounded-3xl w-[280px]" />
                        <h2>Guaranteed Satisfaction.</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default Home;
