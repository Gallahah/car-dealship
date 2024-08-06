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
    image_url: string;
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
                query = query.slice(0, -1);
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
                    className="cars w-full py-6 px-12 grid md:grid-cols-3 gap-4"
                >
                    {cars.map((car: TCar) => (
                        <div className="bg-dark-200 pb-4 hover:drop-shadow-lg hover:scale-105 transition duration-300">
                            <CustomLink
                                to={`/car/${car.id}`}
                                key={car.id}
                            >
                                <div className="text-black p-1">
                                    <div
                                        className="h-[180px] flex flex-col items-center justify-center text-black mb-12
                                        ">
                                        <div className="bg-gray-800 bg-opacity-50 w-full md:px-20 max-md:px-16 h-[100%]">
                                            <img src={car.image_url}  alt={`${car.make} ${car.model}`}
                                                 className="h-full w-full object-cover"/>
                                            <div className="text-left md:-mx-16 max-md:-mx-12 mt-2">
                                                <h3 className="font-lora text-gray-700">{car.year} {car.make}</h3>
                                                <h3 className="font-lora font-semibold text-gray-800">{car.model}</h3>
                                            </div>
                                        </div>
                                    </div>
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
