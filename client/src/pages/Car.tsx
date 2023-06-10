import { useParams } from 'react-router-dom';
import defaultImg from "@/assets/default_image.jpg";
import React, { useEffect, useState } from "react";

export type TCar = {
    id: number;
    type: string;
    make: string;
    model: string;
    year: number;
    price: number;
};

const Car = () => {
    const { id } = useParams();
    const [car, setCar] = useState<TCar>([]);

    const infoStyling = "mx-auto block border border-light-100 rounded-md bg-dark-100 drop-shadow w-3/5 flex justify-center items-center";

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3001/car/${id}`);
            const newCar = await response.json();
            setCar(newCar);
        })();
        }, []);

    const handleDeleteCar = async () => {
        const response = await fetch(`http://localhost:3001/car/${id}`, {
            method: "DELETE",
        });

        const deleteCar = await response.json();
        setCar(deleteCar);
    }

return <section id="car" className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0">
    <div className="grid grid-col-3">
        {/* DISPLAY INFO FROM TABLE */}
        <div className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6 mt-16">
            <img src={defaultImg} alt="default-image"/>
        </div>
        <div className="grid md:grid-cols-4 py-6 gap-8">
            <div className={infoStyling}>Make: {car.make}</div>
            <div className={infoStyling}>Model: {car.model}</div>
            <div className={infoStyling}>Year: {car.year}</div>
            <div className={infoStyling}>Type: {car.type}</div>
        </div>
        {/* UPDATE PRICE INDEX */}
        {/*<div className={`${infoStyling} mb-10 mx-auto w-2/6`}>*/}
        {/*    Price: <h2 className="text-white drop-shadow py-3">${car.price}</h2>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*        <button*/}
        {/*            onClick={handleUpdatePrice}*/}
        {/*            className={`${infoStyling} font-semibold mx-auto mb-10 py-6 w-1/6 transition duration-500 hover:bg-light-100 hover:text-white hover:rounded-lg`}>Bid</button>*/}
        {/*</div>*/}
    </div>
    {/* DELETE CAR */}
    <button
        onClick={() => handleDeleteCar(car.id)}
        className={`font-semibold transition duration-500 hover:drop-shadow hover:bg-light-100 hover:text-white flex justify-center items-center py-6 border border-dark-100 rounded-full bg-light-200 w-2/6 mx-auto mt-10`}>
        Remove Offer
    </button>
</section>
};

export default Car;
