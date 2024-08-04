import CustomLink from "@/components/CustomLink";
import HeroBackground from "@/assets/HeroBackgroundImage.jpg";
import TabsContainer from "@/components/TabsContainer.tsx";

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
        {/*<div className="bg-primary-100 w-full p-4 mt-12">*/}
        {/*    <div className="flex items-center justify-center">*/}
        {/*        <h2>asd</h2>*/}
        {/*    </div>*/}
        {/*</div>*/}
    </section>
}

export default Home;
