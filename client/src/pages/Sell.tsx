import React, {useState} from 'react';
import { TCar } from './Car';

const Sell = () => {
    const [cars, setCars] = useState<TCar[]>([]);
    const [type, setType] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState<number>(2000);
    const [price, setPrice] = useState<number>(0);

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
            className="gap-16 bg-primary-100 py-10 md:h-full md:pb-0"
        >
            <h1 className="flex justify-center mt-16 py-2 border-4 rounded-lg border-dark-200 w-2/5 mx-auto">List a car</h1>
            <div className="py-16 flex justify-center items-center mx-auto">
                <form onSubmit={handleCreateCar}>
                    <div className="gap-8 flex justify-center items-center py-6">
                        <label htmlFor="car-type">Type:</label>
                        <input required
                            id="car-type"
                            value={type}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setType(e.target.value);
                            }} />
                    </div>
                    <div className="gap-8 flex justify-center items-center py-6">
                        <label htmlFor="car-make">Make:</label>
                        <input required
                            id="car-make"
                            value={make}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setMake(e.target.value);
                            }} />
                    </div>
                    <div className="gap-8 flex justify-center items-center py-6">
                        <label htmlFor="car-model">Model:</label>
                        <input required
                            id="car-model"
                            value={model}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setModel(e.target.value);
                            }} />
                    </div>
                    <div className="gap-8 flex justify-center items-center py-6">
                        <label htmlFor="car-year">Year:</label>
                        <input required
                            id="car-year"
                            value={year}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setYear(e.target.value);
                            }} />
                    </div>
                    <div className="gap-8 flex justify-center items-center py-6">
                        <label htmlFor="car-price">Price:</label>
                        <input required
                            id="car-price"
                            value={price}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setPrice(e.target.value);
                            }} />
                    </div>
                    <div className="gap-8 flex justify-center items-center py-6">
                    <button className="transition duration-200 hover:text-white hover:bg-primary-100 py-2 border border-dark-200 bg-dark-100 drop-shadow rounded-md w-4/6">Add Car</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Sell;