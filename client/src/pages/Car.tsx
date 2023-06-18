import { useParams } from 'react-router-dom';
import defaultImg from "@/assets/default_image.jpg";
import React, { useEffect, useState } from "react";
import CustomLink from "@/components/CustomLink.tsx";

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

    const infoStyling = "mx-auto block w-3/5 flex justify-center items-center py-2";

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

        setPrice(prevPrice => prevPrice + 100);
    }


    // Car component UI
return <section id="car" className="gap-16 py-10 md:h-full md:pb-0">
    <div className="grid grid-col-3">
        {/* DISPLAY INFO FROM TABLE */}
        <div className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6 mt-16">
            {/* Placeholder image for all cars */}
            <img src={defaultImg} alt="default-image" className="border-4 border-gray-700 rounded-t-full shadow-md shadow-purple-950"/>

        </div>
        <div className="grid md:grid-cols-4 py-6 gap-8">
            <div className={`${infoStyling} border-2 border-purple-800 border-r-4 border-b-4 border-r-gray-700 border-b-gray-700 rounded-tl-xl drop-shadow-lg`}>Make: {car.make}</div>
            <div className={`${infoStyling} border-2 border-purple-800 border-r-4 border-b-4 border-r-gray-700 border-b-gray-700 drop-shadow-lg`}>Model: {car.model}</div>
            <div className={`${infoStyling} border-2 border-purple-800 border-l-4 border-b-4 border-l-gray-700 border-b-gray-700 drop-shadow-lg`}>Year: {car.year}</div>
            <div className={`${infoStyling} border-2 border-purple-800 border-l-4 border-b-4 border-l-gray-700 border-b-gray-700 rounded-tr-xl drop-shadow-lg`}>Type: {car.type}</div>
        </div>
         {/* UPDATE PRICE BUTTON */}
        <div className={`${infoStyling} mb-10 mx-auto w-1/3 border-4 border-b-purple-900 border-purple-800 rounded-t-2xl text-lg bg-gradient-to-tl from-purple-900 to-gray-800`}>
            Price: <h2 className="text-purple-500 drop-shadow py-3 font-semibold ml-1 text-xl">${price}</h2>
        </div>
        <div>
                <button
                    onClick={handleUpdateCarPrice}
                    className={`${infoStyling} font-semibold text-lg mx-auto mb-4 py-6 w-1/4 transition duration-100 hover:bg-purple-600 bg-gray-800 border-4 border-purple-600 rounded-lg drop-shadow`}>Bid</button>
        </div>
    </div>
    {/* DELETE CAR BUTTON */}
    <CustomLink to={"/buy"}
        onClick={() => handleDeleteCar(car.id)}
        className="font-semibold transition duration-500 border-4 rounded-lg hover:bg-purple-800 text-purple-600 hover:text-white border-purple-800 flex justify-center items-center py-6 w-2/6 mx-auto mt-10">
        Remove Offer
    </CustomLink>
</section>
};

export default Car;