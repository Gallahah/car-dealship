import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import { getAllCars } from "@/api.ts";
import CustomLink from "@/components/CustomLink.tsx";
import { TCar } from "@/pages/Car.tsx";

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [userCars, setUserCars] = useState<TCar[]>([]);

    useEffect(() => {
        const fetchCars = async () => {
            if (user) {
                try {
                    const cars = await getAllCars();
                    const filteredCars = cars.filter((car: TCar) => {
                        return car.owner_id === user.id;
                    });
                    setUserCars(filteredCars);
                } catch (error) {
                    console.error("Failed to fetch cars:", error);
                }
            }
        };

        fetchCars();
    }, [user]);

    return (
        <section id="profile" className="w-full mt-12 py-16 text-black">
            <div className="flex flex-col items-center justify-center space-y-4">
                {!!user && <h2 className="text-4xl font-semibold">Welcome, {user.firstName}</h2>}
                <h1 className="text-2xl">Profile</h1>
            </div>
            <div className="w-1/2 mx-auto mt-6 p-4 border-2 border-light-100 space-y-4">
                <h3><span className="font-semibold">Name:</span> {user?.firstName} {user?.lastName}</h3>
                <h3><span className="font-semibold">Email:</span> {user?.email}</h3>
                <div className="text-center font-semibold text-lg">
                    <h3>Active listings:</h3>
                    {userCars.length > 0 ? (
                        <ul className="cars w-full py-6 px-8 grid md:grid-cols-2 gap-8">
                            {userCars.map((car) => (
                                <li key={car.id}
                                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                                    <CustomLink
                                        to={`/car/${car.id}`}>
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
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No active listings.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
