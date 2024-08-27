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
    return <section id="home" className="gap-16 pt-5 md:pb-0">
        <div className="items-center mt-10">
            <div className="overflow-hidden w-full md:h-96 h-64 brightness-90 bg-black">
                <img alt="Car Image" src={ HeroBackground } className="fixed object-cover w-full h-full object-[50%_60%] max-md:opacity-70 md:opacity-80" />
                <div className="relative text-center pt-10">
                    <h2 className="font-semibold text-4xl text-light-20 p-2">Your Journey Begins Here!</h2>
                        <button className="md:mt-4 max-md:mt-10 p-4 mx-auto items-center flex justify-center
                        before:ease relative overflow-hidden border-b-4 border-r-2 border-gray-800
                        text-gray-800 font-semibold
                        shadow-xl transition-all before:absolute before:top-1/4 before:h-0 before:w-96
                        before:origin-center before:-translate-x-4 before:rotate-45 before:bg-dark-100
                        before:duration-500 hover:text-white rounded-xl hover:before:h-64
                        hover:border-b-light-20 hover:border-r-light-20
                        hover:before:-translate-y-32 z-10">
                            <CustomLink to="/Buy">
                                <span className="z-10 relative">Search for your car</span>
                            </CustomLink>
                        </button>
                </div>
            </div>
            <div className="mt-8">
                <div>
                    <h2 className="text-center text-gray-900 font-semibold text-3xl mb-8">BROWSE OUR SELECTION.</h2>
                    <TabsContainer />
                </div>
            </div>
        </div>
        <div className="bg-light-20 w-5/6 mx-auto mt-12 px-12 py-20 text-gray-800">
            <div className="flex flex-col justify-between items-center">
                <h2 className="text-4xl font-semibold text-center">How It Works.</h2>
                <div className="grid md:grid-cols-3 max-md:grid-cols-1 gap-16 mt-12">
                    <CustomLink to="/Buy">
                        <div className="text-center flex flex-col items-center space-y-4 border border-dark-100 p-6 rounded-lg">
                            <img src={CarIcon} alt="Car Icon" className="w-1/4 drop-shadow-lg" />
                            <h3 className="font-semibold text-xl">Choose your car.</h3>
                            <p className="font-medium text-md">
                                Browse our large selection of vehicles available for test drive.
                            </p>
                        </div>
                    </CustomLink>
                    <CustomLink to="/Buy">
                        <div className="text-center flex flex-col items-center space-y-4 border border-dark-100 p-6 rounded-lg">
                            <img src={HourglassIcon} alt="Hourglass Icon" className="w-1/4 drop-shadow-lg" />
                            <h3 className="font-semibold text-xl">Test it for 3 days.</h3>
                            <p className="font-medium text-md">
                                Rent the car for up to 3 days at a special rate.
                            </p>
                        </div>
                    </CustomLink>
                    <CustomLink to="/Buy">
                        <div className="text-center flex flex-col items-center space-y-4 border border-dark-100 p-6 rounded-lg">
                            <img src={DealIcon} alt="Deal Icon" className="w-1/4 drop-shadow-lg" />
                            <h3 className="font-semibold text-xl">Make it yours.</h3>
                            <p className="font-medium text-md">
                                Buy the car and we'll waive the rental charges.
                            </p>
                        </div>
                    </CustomLink>
                </div>
                <div className="mt-20 font-semibold text-2xl text-center">
                    <h2>
                        Try before you buy. <br /> <span className="max-md:hidden">Three days to try and zero pressure to buy.</span>
                    </h2>
                    <CustomLink to="/signup">
                        <button className="py-3 px-5 mt-8 border-4 border-gray-800 rounded-2xl bg-gray-800 text-light-20 hover:bg-light-20
                         hover:border-light-20 hover:text-gray-800 transition duratio-300 drop-shadow">
                            <span>
                                Get Started
                            </span>
                        </button>
                    </CustomLink>
                </div>
            </div>
        </div>
        <div className="bg-gray-800 w-full p-4">
            <div className="my-8">
                <h3 className="text-center font-semibold text-xl text-light-20">
                    Find a Dealership Near You.
                </h3>
                <div className="flex flex-col gap-10 justify-center">
                    <form className="font-medium flex justify-center items-center gap-4 m-8">
                        <input type="text" placeholder="Find a Dealership Near You"
                               className="rounded-lg w-1/2 text-black text-sm py-2 px-4" />
                        <input type="submit" name="submit" value="Search" disabled
                               className="cursor-pointer border-2 border-light-20 py-1 px-4 rounded text-light-20 font-semibold" />
                    </form>
                </div>
            </div>
        </div>
        <div className="bg-light-20 w-5/6 mx-auto py-24">
            <div className="flex flex-col gap-10 justify-center items-center text-gray-800">
                <h2 className="text-4xl font-semibold mb-4 text-gray-800">
                    Why Buy From Us?
                </h2>
                <div className="grid md:grid-cols-4 max-md:grid-cols-1 gap-8 items-center justify-between font-semibold text-gray-800">
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
        <div className="bg-gray-800 md:w-4/6 max-md:w-full mx-auto py-20 rounded-lg mb-6">
            <div className="mt-6">
                <h2 className="font-semibold text-4xl text-light-20 text-center">
                    Schedule a Test Drive.
                </h2>
                <div className="flex flex-col gap-10">
                    <form className="text-gray-800 font-medium flex flex-col items-center gap-4 m-8">
                        <select className="md:w-1/2 max-md:w-2/3 p-2 rounded text-sm"></select>
                        <input type="text" placeholder="Name" className="rounded text-sm p-2 md:w-1/2 max-md:w-2/3" />
                        <input type="text" placeholder="Phone" className="rounded text-sm p-2 md:w-1/2 max-md:w-2/3" />
                        <input type="text" placeholder="Email" className="rounded text-sm p-2 md:w-1/2 max-md:w-2/3" />
                        <input type="text" placeholder="Address" className="rounded text-sm p-2 md:w-1/2 max-md:w-2/3" />
                        <div className="md:flex items-center justify-between md:w-1/2 max-md:w-2/3 max-md:space-y-2">
                            <input type="date" className="rounded text-sm p-2" />
                            <input type="time" className="rounded text-sm p-2" />
                        </div>
                        <input type="submit" name="submit" value="Book Now" disabled
                               className="mt-8 cursor-pointer border-2 border-light-20 py-2 px-12 rounded text-light-20 font-semibold"/>
                    </form>
                </div>
            </div>
        </div>
        <div className="bg-light-20 w-full py-20 rounded-lg">
            <div className="mt-6">
                <h2 className="font-semibold text-4xl text-gray-800 text-center">
                    Contact Us.
                </h2>
                <div className="flex flex-col gap-10">
                    <form className="text-gray-800 font-medium flex flex-col items-center gap-4 m-8">
                        <input required type="text" placeholder="Full Name" className="rounded text-sm p-2 md:w-1/2 max-md:w-2/3" />
                        <input required type="text" placeholder="Email Address" className="rounded text-sm p-2 md:w-1/2 max-md:w-2/3" />
                        <input type="text" placeholder="Phone Number" className="rounded text-sm p-2 md:w-1/2 max-md:w-2/3" />
                        <input required type="text" placeholder="Message" className="rounded text-sm p-2 pb-20 md:w-1/2 max-md:w-2/3" />

                        <input type="submit" name="submit" value="Send" disabled
                               className="mt-8 cursor-pointer border-2 bg-gray-800 border-gray-800 py-2 px-12 rounded text-light-20 font-semibold"/>
                    </form>
                </div>
            </div>
        </div>
    </section>
}

export default Home;
