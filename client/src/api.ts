const BASE_URL = process.env.NODE_ENV === 'production'
    ? "/car"
    : "http://localhost:3001/car";

// Buy.tsx show cars table & Home.tsx filter tabs
export const fetchCars = async (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL}${queryString ? `?${queryString}` : ''}`);

    return await response.json();
};

// Car.tsx fetch only the specified by id row in the table
export const fetchCar = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`);

    return await response.json();
};

export const updateCarPrice = async (id: number, price: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price }),
    });

    return await response.json();
};

export const deleteCar = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

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