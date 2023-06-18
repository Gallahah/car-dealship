import { motion } from "framer-motion";
import Image1 from "@/assets/image1.png";
import Image2 from "@/assets/image2.jpg";
import Image3 from "@/assets/image3.jpg";
import Image4 from "@/assets/image4.jpg";
import CustomLink from "@/components/CustomLink";

const Home = () => {
    // Home page UI
    return <section id="home" className="gap-16 py-10 md:h-full md:pb-0">
        <div className="md:flex mx-auto w-4/6 items-center justify-center md:h-5/6">
            <div className="z-10 mt-32">
                <motion.div className="md:-mt-20"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5 }}
                            variants={{
                                hidden: { opacity: 0.7, scale: 0.99},
                                visible: { opacity: 1, scale: 1},
                            }}
                >
                    <div className="relative">
                        {/* Home page main graphic */}
                        <img
                            alt="home page image" src={Image1}
                            className="shadow-lg"
                        />
                    </div>
                </motion.div>
                <div className="mt-16 md:flex justify-center items-center gap-8 py-12 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5}}
                        transition={{duration: 0.5, delay: 0.2}}
                        variants={{
                            hidden: {opacity: 0, x: -50},
                            visible: {opacity: 1, x: 0},
                        }}
                        className="md:w-2/5 mx-auto relative">
                        <CustomLink to="/buy">
                            <div className="transition duration-500 hover:scale-110 hover:shadow-gray-950">
                        <img className="shadow-xl opacity-60 rounded-md transition duration-700 hover:opacity-90" alt="image" src={Image2}/>
                        <h3 className="opacity-20 transition duration-400 hover:opacity-80 hover:text-purple-400 absolute font-semibold text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Buy</h3>
                            </div>
                        </CustomLink>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5}}
                        transition={{duration: 0.5, delay: 0.4}}
                        variants={{
                            hidden: {opacity: 0, x: -50},
                            visible: {opacity: 1, x: 0},
                        }}
                        className="md:w-2/5 mx-auto relative"
                    >
                    <CustomLink to="/sell">
                        <div className="transition duration-500 hover:scale-110 hover:shadow-gray-950">
                        <img className="shadow-xl opacity-60 rounded-md transition duration-700 hover:opacity-90" alt="image" src={Image4}/>
                        <h3 className="opacity-20 transition duration-400 hover:opacity-80 hover:text-purple-400 absolute font-semibold text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Sell</h3>
                        </div>
                    </CustomLink>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5}}
                        transition={{duration: 0.5, delay: 0.6}}
                        variants={{
                            hidden: {opacity: 0, x: -50},
                            visible: {opacity: 1, x: 0},
                        }}
                        className="md:w-2/5 mx-auto relative">
                        <CustomLink to="/">
                            <div className="transition duration-500 hover:scale-110 hover:shadow-gray-950">
                        <img className="shadow-xl opacity-60 rounded-md transition duration-700 hover:opacity-90" alt="image" src={Image3}/>
                        <h3 className="opacity-20 transition duration-400 hover:opacity-80 hover:text-purple-400 absolute text-5xl font-semibold text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Sign Up</h3>
                            </div>
                        </CustomLink>
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
}

export default Home;
