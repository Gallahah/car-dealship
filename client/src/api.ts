const BASE_URL = process.env.NODE_ENV === 'production'
    ? "/car"
    : "http://localhost:3001/car";

// Buy.tsx show cars table
export const fetchCars = async () => {
    const response = await fetch(`${BASE_URL}`);

    return await response.json();
};

// Sell.tsx add a new row to the cars table
export const createCar = async (carData: {
    type: string;
    make: string;
    model: string;
    year: number;
    price: number;
    image?: File | null;
}) => {
    const formData = new FormData();
    formData.append('make', carData.make);
    formData.append('type', carData.type);
    formData.append('model', carData.model);
    formData.append('year', carData.year.toString());
    formData.append('price', carData.price.toString());
    if (carData.image) {
        formData.append('image', carData.image);
    }

    const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: formData,
    });
    return await response.json();
};