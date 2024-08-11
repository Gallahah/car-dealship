const BASE_URL = process.env.NODE_ENV === 'production'
    ? ""
    : "http://localhost:3001";

const createEndpoint = (path: string) => `${BASE_URL}${path}`;

const CAR_ENDPOINT = createEndpoint('/car');
const USER_ENDPOINT = createEndpoint('/user');

// Buy.tsx show cars table & Home.tsx filter tabs
export const fetchCars = async (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${CAR_ENDPOINT}${queryString ? `?${queryString}` : ''}`);

    return await response.json();
};

// Car.tsx fetch only the specified by id row in the table
export const fetchCar = async (id: number) => {
    const response = await fetch(`${CAR_ENDPOINT}/${id}`);

    return await response.json();
};

export const updateCarPrice = async (id: number, price: number) => {
    const response = await fetch(`${CAR_ENDPOINT}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price }),
    });

    return await response.json();
};

export const deleteCar = async (id: number) => {
    const response = await fetch(`${CAR_ENDPOINT}/${id}`, {
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

    const response = await fetch(`${CAR_ENDPOINT}`, {
        method: "POST",
        body: formData,
    });

    return await response.json();
};

// SignUp.tsx add a new user to the database
export const createUser = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}) => {

    const response = await fetch(`${USER_ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
    });

    return await response.json();
};

// Login.tsx login user
export const loginUser = async (email: string, password: string): Promise<{ firstName: string } | null> => {
    const response = await fetch(`${USER_ENDPOINT}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Invalid email or password");
    }

    const data = await response.json();
    const token = data.token;

    localStorage.setItem("token", token);

    const userResponse = await fetch(`${USER_ENDPOINT}`, {
        method: "GET",
        body: JSON.stringify({ email }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!userResponse.ok) {
        throw new Error("Invalid token");
    }

    const userData = await userResponse.json();
    return { firstName: userData.firstName };
};