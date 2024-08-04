import { useEffect, useState } from "react";
import CustomLink from "@/components/CustomLink";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

type TCar = {
    id: number;
    make: string;
    model: string;
    year: number;
    type: string;
    price: number;
};

const Buy = () => {
    const [cars, setCars] = useState<TCar[]>([]);
    const location = useLocation();

    useEffect(() => {
        const fetchCars = async () => {
            const params = new URLSearchParams(location.search);
            const min = params.get('min');
            const max = params.get('max');
            const make = params.get('make');
            const type = params.get('type');

            let query = `http://localhost:3001/cars`;

            if (min || max || make || type) {
                query += '?';
                if (min) query += `min=${min}&`;
                if (max) query += `max=${max}&`;
                if (make) query += `make=${make}&`;
                if (type) query += `type=${type}&`;
                query = query.slice(0, -1); // Remove trailing '&'
            }

            const response = await fetch(query);
            const newCars = await response.json();
            setCars(newCars);
        };

        fetchCars();
    }, [location.search]);

    return (
        <section id="buy" className="gap-16 py-10 md:h-full md:pb-0 mt-10">
            <div className="py-6 flex">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, y: -30 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    className="cars w-full mx-auto py-6 grid grid-cols-3 gap-8 justify-center items-center"
                >
                    {cars.map((car: TCar) => (
                        <CustomLink
                            to={`/car/${car.id}`}
                            key={car.id}
                        >
                            <div
                                className="mx-4 h-[180px] border-4 rounded-r-lg border-purple-700 text-gray-300
                                font-semibold bg-gradient-to-br from-purple-700 to-gray-900 flex items-center
                                justify-center transition duration-500 hover:scale-105 hover:text-white
                                hover:animate-pulse hover:border-purple-800">
                                {`${car.make} ${car.model} ${car.year}`}
                            </div>
                        </CustomLink>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Buy;
