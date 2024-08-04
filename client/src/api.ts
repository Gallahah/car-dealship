export const fetchCars = async () => {
    const response = await fetch('http://localhost:3001/cars');
    if (!response.ok) {
        throw new Error('Failed to fetch car data');
    }
    return await response.json();
};
