import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import CustomLink from "@/components/CustomLink.tsx";
import { SocialIcon } from "react-social-icons";
import { fetchCar, updateCarPrice, deleteCar } from "@/api.ts";
import { UserContext } from "@/context/userContext.tsx";

export type TCar = {
    id: number;
    type: string;
    make: string;
    model: string;
    year: number;
    price: number;
    image_url: string;
    owner_id: number;
    kilometres: number;
    description: string;
};

const Car = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<TCar | null>(null);
    const [price, setPrice] = useState<number>(0);
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

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
            navigate("/home");
        }
    };

    // Update car price
    const handleUpdateCarPrice = async () => {
        if (id && car) {
            const newPrice = price + 100;
            const updatedCar: TCar = {
                ...car,
                price: newPrice,
            };
            await updateCarPrice(parseInt(id), newPrice);
            setPrice(newPrice);
            setCar(updatedCar);
        }
    };

    if (!car) return <div className="font-semibold text-3xl mt-8 text-center">Loading...</div>;

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
            <div className="container mx-auto md:flex items-center justify-between px-12 py-8">
                <div className="md:w-1/2">
                    <img src={car.image_url} alt={`${car.make} ${car.model}`} className="w-full max-h-80 object-cover" />
                </div>
                <div className="md:w-1/2 md:ml-12 flex flex-col mt-6">
                    <h2 className="text-2xl font-bold mb-4">{car.make} {car.model} ({car.year})</h2>
                    <p className="text-lg mb-4">Type: {car.type}</p>
                    <p className="text-lg mb-4">Price: ${car.price.toFixed(2)}</p>
                    {car.kilometres !== null ? (
                            <p className="text-lg mb-4">Kilometres: {car.kilometres}</p>
                        ) : null
                    }
                    <div className="flex max-md:flex-col max-md:space-y-4 justify-between">
                        {/* TODO: fix alignment */}
                        {user ? (
                            user.id !== car.owner_id ? (
                                <button
                                    className="bg-dark-100 hover:bg-dark-200 text-white font-bold py-2 px-4 rounded max-md:w-full"
                                    onClick={handleUpdateCarPrice}
                                >
                                    Bid
                                </button>
                            ) : (
                                <CustomLink to={`/car/${id}/edit`}>
                                    <span className="bg-dark-100 hover:bg-dark-200 text-white font-bold py-2 px-4 rounded max-md:w-full">
                                        Edit
                                    </span>
                                </CustomLink>
                            )
                        ) : (
                            <CustomLink to="/signup">
                                <span className="bg-dark-100 hover:bg-dark-200 text-white font-bold py-2 px-4 rounded max-md:w-full">
                                    Bid
                                </span>
                            </CustomLink>
                        )}
                        {/* TODO: Optimize */}
                        {/* Non-owner user logged in view */}
                        {user && user.id !== car.owner_id ? (
                            <CustomLink to="/home">
                                <button
                                    className="max-md:w-full bg-light-100 hover:bg-light-200 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleDeleteCar}
                                >
                                    Purchase
                                </button>
                            </CustomLink>
                        ) : null}
                        {/* Owner logged in view */}
                        {user && user.id === car.owner_id ? (
                            <CustomLink to="/home">
                                <button
                                    className="max-md:w-full bg-light-100 hover:bg-light-200 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleDeleteCar}
                                >
                                    Remove listing
                                </button>
                            </CustomLink>
                        ) : null}
                    </div>
                </div>
            </div>

                <div className="container mx-auto px-12 py-8 mb-8">
                    <h3 className="text-xl font-bold mb-4">
                        Additional Information
                    </h3>
                    {car.description ? (
                    <p>
                        {car.description}
                    </p>
                    ) : (
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Culpa ipsum placerat consetetur ullamcorper.
                            Eirmod excepteur assum, elit vel nonummy wisi cupiditat amet voluptua zzril duis nisl sit
                            ullamco veniam dolor elit dignissim erat laoreet eum exerci sed dolor erat laoreet kasd.
                            Enim no nam ex congue sed imperdiet feugait euismod consectetuer assum laborum et
                            adipiscing mollit velit, laborum aliquip stet feugait accusam voluptate adipisici
                            qui illum laoreet aliquyam.
                        </div>
                    )}
                </div>

        </section>
    );
};

export default Car;