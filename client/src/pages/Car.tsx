import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import CustomLink from "@/components/CustomLink.tsx";
import { SocialIcon } from "react-social-icons";
import { fetchCar, updateCarPrice, deleteCar } from "@/api.ts";

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
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<TCar | null>(null);
    const [price, setPrice] = useState<number>(0);

    // Fetching car data from the backend
    useEffect(() => {
        (async () => {
            if (id) {
                const newCar = await fetchCar(parseInt(id));
                setCar(newCar);
                setPrice(newCar.price);
            }
        })();
    }, [id]);

    // Delete the car from the table
    const handleDeleteCar = async () => {
        if (id) {
            await deleteCar(parseInt(id));
            setCar(null);
        }
    };

    // Update car price
    const handleUpdateCarPrice = async () => {
        if (id) {
            const newPrice = price + 100;
            await updateCarPrice(parseInt(id), newPrice);
            setPrice(newPrice);
        }
    };

    if (!car) return <div>Loading...</div>;

    // Car component UI
    return (
        <section id="car" className="md:h-full md:pb-0 text-black top-0 mt-20">
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

            <button onClick={handleUpdateCarPrice}>
                Increase Price
            </button>

            {/* DELETE CAR BUTTON */}
            <CustomLink to={"/home"}>
                <button onClick={handleDeleteCar}>
                    Purchase
                </button>
            </CustomLink>
        </section>
    );
};

export default Car;
