import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import CustomLink from "@/components/CustomLink.tsx";
import { SocialIcon } from "react-social-icons";

export type TCar = {
    id: number;
    type: string;
    make: string;
    model: string;
    year: number;
    price: number;
    image_url: string;
};

const Car = () => {
    const { id } = useParams();
    const [car, setCar] = useState<TCar>([]);
    const [price, setPrice] = useState<number>(0);

    // Fetching car data from the backend
    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3001/car/${id}`);
            const newCar = await response.json();
            setCar(newCar);
        })();
        }, []);

    // Delete the car from the table
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

    // const handleUpdateCarPrice = async () => {
    //     await fetch(`http://localhost:3001/car/${id}`, {
    //         method: "PUT",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({ price: price + 100 }),
    //     });
    //
    //     setPrice(prevPrice => prevPrice + 100);
    // }

    // Car component UI
return <section id="car" className="md:h-full md:pb-0 text-black top-0 mt-20">
    <div className="w-full bg-gray-200 py-12 flex justify-center px-6">
        <div className="gap-12 flex">
            <SocialIcon target="_blank" url="https://www.facebook.com" />
            <SocialIcon target="_blank" url="https://www.x.com" />
            <SocialIcon target="_blank" url="https://www.whatsapp.com" />
        </div>
    </div>
    <div className="h-full flex items-center justify-between px-12">
        <img src={car.image_url} alt={`${car.make} ${car.model}`} />
        <div>asd</div>
    </div>

        {/* DELETE CAR BUTTON */}
        <CustomLink to={"/home"}>
            <button
                onClick={() => handleDeleteCar()}>
                Purchase
            </button>
        </CustomLink>
    </section>
};

export default Car;