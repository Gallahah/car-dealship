import React, { useState } from 'react';
import { TCar } from './Car';

const Sell = () => {
    const [cars, setCars] = useState<TCar[]>([]);
    const [type, setType] = useState("Sedan");
    const [make, setMake] = useState("Audi");
    const [model, setModel] = useState("");
    const [year, setYear] = useState<number>();
    const [price, setPrice] = useState<number>();

    // Fetching the data/columns needed to create a new row in the table
    const createCar = async (type: string, make: string, model: string, year: number, price: number) => {
        const response = await fetch(`http://localhost:3001/car`, {
            method: "POST",
            body: JSON.stringify({
                make,
                type,
                model,
                year,
                price,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.json();
    }

    // Handling the creation of a new row in the cars table in the frontend
    const handleCreateCar = async (e: React.FormEvent) => {
        e.preventDefault();
        const car = await createCar(type, make, model, year, price);
        setCars([...cars, car]);
        setType("");
        setMake("");
        setModel("");
        setYear("");
        setPrice("");
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
                            id="car-type" className="block w-full p-2.5 rounded-lg text-md border focus:border:purple-600 focus:ring-purple-600 placeholder-gray-700 border-gray-600 bg-gray-800"
                            value={type} placeholder="Type"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setType(e.target.value);
                            }}>
                            <option selected>Sedan</option>
                            <option>SUV</option>
                            <option>Coupe</option>
                            <option>Hatchback</option>
                            <option>Station Wagon</option>
                        </select>
                    </div>
                    <div className="gap-8 py-6">
                        <label htmlFor="car-make"></label>
                        <select required
                            id="car-make" className="block w-full p-2.5 rounded-lg text-md border focus:border:purple-600 focus:ring-purple-600 placeholder-gray-700 border-gray-600 bg-gray-800"
                            value={make} placeholder="Make"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setMake(e.target.value);
                            }}>
                            <option selected>Audi</option>
                            <option>Alfa Romeo</option>
                            <option>Acura</option>
                            <option>Aston Martin</option>
                            <option>BMW</option>
                            <option>Bentley</option>
                            <option>Bugatti</option>
                            <option>Cadillac</option>
                            <option>Chrysler</option>
                            <option>Chevrolet</option>
                            <option>Citroen</option>
                            <option>Dodge</option>
                            <option>Daewoo</option>
                            <option>Dacia</option>
                            <option>Ferrari</option>
                            <option>Ford</option>
                            <option>Fiat</option>
                            <option>Great Wall</option>
                            <option>Honda</option>
                            <option>Hyundai</option>
                            <option>Infinity</option>
                            <option>Isuzu</option>
                            <option>Jeep</option>
                            <option>Jaguar</option>
                            <option>Kia</option>
                            <option>Lamborghini</option>
                            <option>Lexus</option>
                            <option>Lincoln</option>
                            <option>Land Rover</option>
                            <option>Maserati</option>
                            <option>Mazda</option>
                            <option>Mercedes-Benz</option>
                            <option>McLaren</option>
                            <option>Mitsubishi</option>
                            <option>Mini</option>
                            <option>Nissan</option>
                            <option>Nio</option>
                            <option>Opel</option>
                            <option>Porsche</option>
                            <option>Peugeot</option>
                            <option>Pagani</option>
                            <option>Rolls-Royce</option>
                            <option>Renault</option>
                            <option>Subaru</option>
                            <option>Saab</option>
                            <option>Suzuki</option>
                            <option>Skoda</option>
                            <option>SEAT</option>
                            <option>Tesla</option>
                            <option>Toyota</option>
                            <option>Volkswagen</option>
                            <option>Volvo</option>
                            <option>Volvo</option>
                        </select>
                    </div>
                    <div className="gap-8 py-6">
                        <label htmlFor="car-model"></label>
                        <input required
                            id="car-model" className="placeholder-gray-700 border-gray-600 bg-gray-800 block w-full p-2.5 rounded-lg text-md border focus:border:purple-600 focus:ring-purple-600"
                            value={model} placeholder="Model"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setModel(e.target.value);
                            }} />
                    </div>
                    <div className="gap-8 py-6">
                        <label htmlFor="car-year"></label>
                        <input required
                            id="car-year" className="mx-auto placeholder-gray-700 border-gray-600 bg-gray-800 block w-full p-2.5 rounded-lg text-md border focus:border:purple-600 focus:ring-purple-600"
                            value={year} placeholder="Year"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setYear(e.target.value);
                            }} />
                    </div>
                    <div className="gap-8 py-6">
                        <label htmlFor="car-price"></label>
                        <input required
                            id="car-price" className="placeholder-gray-700 border-gray-600 bg-gray-800 block w-full p-2.5 rounded-lg text-md border focus:border:purple-600 focus:ring-purple-600"
                            value={price} placeholder="Price"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setPrice(e.target.value);
                            }} />
                    </div>
                    <div className="gap-8 flex justify-center items-center py-6">
                    <button className="text-lg font-semibold transition duration-200 hover:text-white hover:bg-purple-800 py-2 border border-purple-600 bg-gray-800 drop-shadow rounded-md w-4/6">Add Car</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Sell;