import React, { useEffect, useState } from "react";
import CustomLink from "@/components/CustomLink";
// import image from "@/assets/default_image.jpg";

type TCar = {
    id: number;
    make: string;
    model: string;
    year: number;
}

const Buy = () => {
    const [cars, setCars] = useState<TCar>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3001/cars`);
            const newCars = await response.json();
            setCars(newCars);
        })();
    }, []);

    return <section
        id="buy"
        className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0 mt-10"
    >
        <div className="py-6 flex">
                    <div className="cars w-full mx-auto py-6 grid grid-cols-3 gap-8 flex justify-center items-center">
                        {
                            cars.map((car: any) => (
                                <CustomLink
                                    to={`/car/${car.id}`}
                                    key={car.id}
                                    className="h-[180px] border rounded-r-lg flex items-center justify-center"
                                >{`${car.make} ${car.model} ${car.year}`}</CustomLink>
                            ))
                        }
                    </div>
        </div>
    </section>
}

export default Buy;