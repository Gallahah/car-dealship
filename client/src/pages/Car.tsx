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
    const [price, setPrice] = useState<number>(0);

    const infoStyling = "mx-auto block border border-light-100 rounded-md bg-dark-100 drop-shadow w-3/5 flex justify-center items-center";

    // Fetching car data from the backend and handling the deletion
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

    // Fetching the car price from the backend and handling the update of the price, incrementing it by 100
    useEffect(() => {
        const fetchCarPrice = async () => {
            const response = await fetch(`http://localhost:3001/car/${id}`);
            const carData = await response.json();
            setPrice(parseInt(carData.price));
        };

        fetchCarPrice();
    }, [id]);

    const handleUpdateCarPrice = async () => {
        await fetch(`http://localhost:3001/car/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ price: price + 100 }),
        });

        // const updateCarPrice = await response.json();
        setPrice(prevPrice => prevPrice + 100);
    }


    // Car component UI
return <section id="car" className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0">
    <div className="grid grid-col-3">
        {/* DISPLAY INFO FROM TABLE */}
        <div className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6 mt-16">
            {/* Placeholder image for all the cars */}
            <img src={defaultImg} alt="default-image"/>
        </div>
        <div className="grid md:grid-cols-4 py-6 gap-8">
            <div className={infoStyling}>Make: {car.make}</div>
            <div className={infoStyling}>Model: {car.model}</div>
            <div className={infoStyling}>Year: {car.year}</div>
            <div className={infoStyling}>Type: {car.type}</div>
        </div>
         {/* UPDATE PRICE BUTTON */}
        <div className={`${infoStyling} mb-10 mx-auto w-2/6`}>
            Price: <h2 className="text-white drop-shadow py-3">${price}</h2>
        </div>
        <div>
                <button
                    onClick={handleUpdateCarPrice}
                    className={`${infoStyling} font-semibold mx-auto mb-10 py-6 w-1/6 transition duration-500 hover:bg-light-100 hover:text-white hover:rounded-lg`}>Bid</button>
        </div>
    </div>
    {/* DELETE CAR BUTTON */}
    <button
        onClick={() => handleDeleteCar(car.id)}
        className={`font-semibold transition duration-500 hover:drop-shadow hover:bg-light-100 hover:text-white flex justify-center items-center py-6 border border-dark-100 rounded-full bg-light-200 w-2/6 mx-auto mt-10`}>
        Remove Offer
    </button>
</section>
};

export default Car;
