import { useEffect, useState } from "react";
import CustomLink from "@/components/CustomLink";
import { motion } from "framer-motion";
// import image from "@/assets/default_image.jpg";

type TCar = {
    id: number;
    make: string;
    model: string;
    year: number;
}

const Buy = () => {
    const [cars, setCars] = useState<TCar>([]);

    // Fetch the car data from the database
    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3001/cars`);
            const newCars = await response.json();
            setCars(newCars);
        })();
    }, []);

    // Creating a grid for the separate cars to be displayed and mapping the objects to the page ids
    return <section
        id="buy"
        className="gap-16 py-10 md:h-full md:pb-0 mt-10"
    >
        <div className="py-6 flex">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, y: -30},
                            visible: { opacity: 1, y: 0},
                        }}
                        className="cars w-full mx-auto py-6 grid grid-cols-3 gap-8 justify-center items-center">
                        {
                            cars.map((car: any) => (
                                <CustomLink
                                    to={`/car/${car.id}`}
                                    key={car.id}
                                    className="h-[180px] border-4 rounded-r-lg border-purple-700 text-gray-300 font-semibold
                                    bg-gradient-to-br from-purple-700 to-gray-900
                                    flex items-center justify-center
                                    transition duration-500 hover:scale-105 hover:text-white hover:animate-pulse hover:border-purple-800"
                                >
                                    {`${car.make} ${car.model} ${car.year}`}
                                </CustomLink>
                            ))
                        }
                    </motion.div>
        </div>
    </section>
}

export default Buy;