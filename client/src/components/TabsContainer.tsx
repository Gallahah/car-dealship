import React, { useEffect, useState } from 'react';
import Tabs from './Tabs';
import { fetchCars } from '@/api';
import { useNavigate } from 'react-router-dom';

type Car = {
    id: number;
    type: string;
    make: string;
    model: string;
    year: number;
    price: number;
};

const TabsContainer: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const styling = "border-2 p-2 rounded md:px-8 hover:scale-105 hover:border-dark-100 transition duration-200"

    useEffect(() => {
        const getCars = async () => {
            try {
                const data = await fetchCars();
                setCars(data);
            } catch (err) {
                setError('Failed to fetch car data');
            } finally {
                setLoading(false);
            }
        };

        getCars();
    }, []);

    if (loading) {
        return <div className="text-black text-center text-xl mt-12">Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const priceRanges = [
        { label: 'Under $5,000', min: 0, max: 5000 },
        { label: '$5,000 - $10,000', min: 5000, max: 10000 },
        { label: '$10,000 - $20,000', min: 10000, max: 20000 },
        { label: '$20,000 - $50,000', min: 20000, max: 50000 },
        { label: 'Above $50,000', min: 50000, max: Infinity },
    ];

    const makes = [...new Set(cars.map(car => car.make))];
    const types = [...new Set(cars.map(car => car.type))];

    const tabsConfig = [
        {
            label: 'Price',
            content: (
                <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
                    {priceRanges.map(range => (
                        <button
                            key={range.label}
                            className={styling}
                            onClick={() => navigate(`/buy?min=${range.min}&max=${range.max === Infinity ? '' : range.max}`)}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            ),
        },
        {
            label: 'Make',
            content: (
                <div className="grid md:grid-cols-6 max-md:grid-cols-3 gap-4">
                    {makes.map(make => (
                        <button
                            key={make}
                            className={styling}
                            onClick={() => navigate(`/buy?make=${make}`)}
                        >
                            {make}
                        </button>
                    ))}
                </div>
            ),
        },
        {
            label: 'Type',
            content: (
                <div className="grid md:grid-cols-6 max-md:grid-cols-3 gap-4">
                    {types.map(type => (
                        <button
                            key={type}
                            className={styling}
                            onClick={() => navigate(`/buy?type=${type}`)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            ),
        },
    ];

    const tabs = tabsConfig.map(config => ({
        label: config.label,
        content: config.content,
    }));

    return <Tabs tabs={tabs} />;
};

export default TabsContainer;
