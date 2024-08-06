import React, { useState } from 'react';
import { TCar } from './Car';
import { useNavigate } from "react-router-dom";

const Sell = () => {
    const [cars, setCars] = useState<TCar[]>([]);
    const [type, setType] = useState("Sedan");
    const [make, setMake] = useState("Audi");
    const [model, setModel] = useState("");
    const [year, setYear] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);

    const navigate = useNavigate();

    const createCar = async (type: string, make: string, model: string, year: number | undefined, price: number | undefined, image?: File | null) => {
        const formData = new FormData();
        formData.append('make', make);
        formData.append('type', type);
        formData.append('model', model);
        formData.append('year', year?.toString() || '');
        formData.append('price', price?.toString() || '');
        if (image) {
            formData.append('image', image);
        }

        const response = await fetch(`http://localhost:3001/car`, {
            method: "POST",
            body: formData,
        });

        return response.json();
    }

    const handleCreateCar = async (e: React.FormEvent) => {
        e.preventDefault();

        const yearNumber = Number(year);
        const priceNumber = Number(price);

        if (isNaN(yearNumber) || isNaN(priceNumber) || yearNumber <= 0 || priceNumber <= 0) {
            alert("Please enter valid numbers for Year and Price.");
            return;
        }

        const car = await createCar(type, make, model, yearNumber, priceNumber, image);
        setCars([...cars, car]);
        setType("Sedan");
        setMake("Audi");
        setModel("");
        setYear("");
        setPrice("");
        setImage(null);

        navigate('/home');
    }

    return (
        <section
            id="sell"
            className="gap-16 py-10 md:h-full md:pb-0"
        >
            <h1 className="text-2xl font-semibold flex justify-center mt-16 py-2 border-4 bg-purple-900 rounded-lg border-purple-900 w-2/5 mx-auto">List a car</h1>
            <div className="py-16 flex justify-center items-center mx-auto">
                <form onSubmit={handleCreateCar}>
                    <div className="flex justify-center items-center py-6">
                        <label htmlFor="car-type"></label>
                        <select required
                                id="car-type"
                                className="block w-full p-2.5 rounded-lg text-md border focus:border:purple-600 focus:ring-purple-600 placeholder-gray-700 border-gray-600 bg-gray-800"
                                value={type} placeholder="Type"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    setType(e.target.value);
                                }}>
                            {['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Wagon', 'Luxury', 'Truck', 'Minivan', 'Convertible', 'Electric', 'Crossover', 'Sports Car', 'Compact', 'Full-size', 'Hybrid', 'Midsize']
                                .map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="gap-8 py-6">
                        <label htmlFor="car-make"></label>
                        <select required
                                id="car-make"
                                className="block w-full p-2.5 rounded-lg text-md border focus:border:purple-600 focus:ring-purple-600 placeholder-gray-700 border-gray-600 bg-gray-800"
                                value={make} placeholder="Make"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    setMake(e.target.value);
                                }}>
                            {[
                                'Audi', 'Alfa Romeo', 'Acura', 'Aston Martin', 'BMW', 'Bentley', 'Bugatti', 'Cadillac', 'Chrysler',
                                'Chevrolet', 'Citroen', 'Dodge', 'Daewoo', 'Dacia', 'Ferrari', 'Ford', 'Fiat', 'Great Wall', 'Honda',
                                'Hyundai', 'Infinity', 'Isuzu', 'Jeep', 'Jaguar', 'Kia', 'Lamborghini', 'Lexus', 'Lincoln', 'Land Rover',
                                'Maserati', 'Mazda', 'Mercedes-Benz', 'McLaren', 'Mitsubishi', 'Mini', 'Nissan', 'Nio', 'Opel',
                                'Porsche', 'Peugeot', 'Pagani', 'Rolls-Royce', 'Renault', 'Subaru', 'Saab', 'Suzuki', 'Skoda', 'SEAT',
                                'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
                            ].map((make, index) => (
                                <option key={index} value={make}>
                                    {make}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="gap-8 py-6">
                        <label htmlFor="car-model"></label>
                        <input required
                               id="car-model"
                               className="placeholder-gray-700 border-gray-600 bg-gray-800 block w-full p-2.5 rounded-lg text-md border focus:border:purple-600 focus:ring-purple-600"
                               value={model} placeholder="Model"
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   setModel(e.target.value);
                               }}/>
                    </div>
                    <div className="gap-8 py-6">
                        <label htmlFor="car-year"></label>
                        <input required
                               id="car-year"
                               className="mx-auto placeholder-gray-700 border-gray-600 bg-gray-800 block w-full p-2.5 rounded-lg text-md border focus:border:purple-600 focus:ring-purple-600"
                               value={year} placeholder="Year"
                               pattern="\d{4}"
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   setYear(e.target.value);
                               }}/>
                    </div>
                    <div className="gap-8 py-6">
                        <label htmlFor="car-price"></label>
                        <input required
                               id="car-price"
                               className="placeholder-gray-700 border-gray-600 bg-gray-800 block w-full p-2.5 rounded-lg text-md border focus:border:purple-600 focus:ring-purple-600"
                               value={price} placeholder="Price"
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                   setPrice(e.target.value);
                               }}/>
                    </div>
                    <div className="gap-8 py-6 text-black">
                        <label htmlFor="car-image">Upload Image:</label>
                        <input
                            id="car-image"
                            type="file"
                            accept="image/*"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.files && e.target.files[0]) {
                                    setImage(e.target.files[0]);
                                }
                            }}
                        />
                    </div>
                    <div className="gap-8 flex justify-center items-center py-6">
                        <button
                            className="text-lg font-semibold transition duration-200 hover:text-white
                            hover:bg-purple-800 py-2 border border-purple-600 bg-gray-800 drop-shadow rounded-md w-4/6"
                        >
                            Sell Car
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Sell;
