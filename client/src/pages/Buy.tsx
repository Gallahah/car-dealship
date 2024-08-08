// client/pages/Buy.tsx

import { useEffect, useState } from "react";
import CustomLink from "@/components/CustomLink";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { fetchCars } from "@/api.ts";

type TCar = {
    id: number;
    make: string;
    model: string;
    year: number;
    type: string;
    price: number;
    image_url: string;
};

const Buy = () => {
    const [cars, setCars] = useState<TCar[]>([]);
    const location = useLocation();

    useEffect(() => {
        const loadCars = async () => {
            const params = new URLSearchParams(location.search);
            const min = params.get('min');
            const max = params.get('max');
            const make = params.get('make');
            const type = params.get('type');

            const query: Record<string, string> = {};

            if (min) query.min = min;
            if (max) query.max = max;
            if (make) query.make = make;
            if (type) query.type = type;

            const newCars = await fetchCars(query);
            setCars(newCars);
        };

        loadCars();
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
                    className="cars w-full py-6 px-12 grid md:grid-cols-3 gap-8"
                >
                    {cars.map((car: TCar) => (
                        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <CustomLink
                                to={`/car/${car.id}`}
                                key={car.id}
                            >
                                <div className="h-[240px] overflow-hidden relative">
                                    <img
                                        src={car.image_url}
                                        alt={`${car.make} ${car.model}`}
                                        className="bg-gradient-to-t from-black/60 to-transparent h-full w-full object-cover transform transition-transform duration-300 hover:scale-110"
                                    />
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                                <div className="px-6 py-4">
                                    <h3 className="font-bold text-lg mb-2 text-black">{car.make} {car.model}</h3>
                                    <p className="text-gray-600">{car.year} • {car.type}</p>
                                    <p className="text-gray-800 font-bold text-xl mt-2">${car.price.toFixed(2)}</p>
                                </div>
                            </CustomLink>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Buy;