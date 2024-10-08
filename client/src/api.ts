const BASE_URL = process.env.NODE_ENV === 'production'
    ? ""
    : "http://localhost:3001";

const createEndpoint = (path: string) => `${BASE_URL}${path}`;

const CAR_ENDPOINT = createEndpoint('/car');
const USER_ENDPOINT = createEndpoint('/user');

const createCarFormData = (carData: {
    image: File | null;
    year: number;
    price: number;
    model: string;
    type: string;
    ownerId: number;
    make: string;
    kilometres: number;
    description: string;
}) => {
    const formData = new FormData();
    formData.append('make', carData.make);
    formData.append('type', carData.type);
    formData.append('model', carData.model);
    formData.append('year', carData.year.toString());
    formData.append('price', carData.price.toString());
    formData.append('ownerId', carData.ownerId.toString());
    formData.append('kilometres', carData.kilometres.toString());
    formData.append('description', carData.description);

    if (carData.image) {
        formData.append('image', carData.image);
    }

    return formData;
};


// Buy.tsx show cars table & Home.tsx filter tabs
export const fetchCars = async (params: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${CAR_ENDPOINT}${queryString ? `?${queryString}` : ''}`);

    return await response.json();
};

// Fetch all cars from DB
export const getAllCars = async () => {
    const response = await fetch(`${CAR_ENDPOINT}`);
    return await response.json();
}

// Car.tsx fetch only the specified by id row in the table
export const fetchCar = async (id: number) => {
    const response = await fetch(`${CAR_ENDPOINT}/${id}`);

    return await response.json();
};

// Car.tsx update car price in table
export const updateCarPrice = async (id: number, price: number) => {
    const response = await fetch(`${CAR_ENDPOINT}/${id}/price`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price }),
    });

    return await response.json();
};

// Delete row from table
export const deleteCar = async (id: number) => {
    const response = await fetch(`${CAR_ENDPOINT}/${id}`, {
        method: "DELETE",
    });

    return await response.json();
};

// Sell.tsx add a new row to the cars table
export const createCar = async (carData: {
    image: File | null;
    year: number;
    price: number;
    model: string;
    type: string;
    ownerId: number;
    make: string;
    kilometres: number;
    description: string;
}) => {
    const formData = createCarFormData(carData);

    if (carData.image) {
        formData.append('image', carData.image);
    }

    const response = await fetch(`${CAR_ENDPOINT}`, {
        method: "POST",
        body: formData,
    });

    return await response.json();
};

// Edit.tsx update car data
export const editCar = async (id: number, carData: {
    image: File | null;
    year: number;
    price: number;
    model: string;
    type: string;
    make: string;
    kilometres: number;
    description: string;
})=> {
    const formData = new FormData();

    formData.append('make', carData.make);
    formData.append('type', carData.type);
    formData.append('model', carData.model);
    formData.append('description', carData.description);
    formData.append('year', carData.year.toString());
    formData.append('price', carData.price.toString());
    formData.append('kilometres', carData.kilometres.toString());

    if (carData.image) {
        formData.append('image', carData.image);
    }

    const response = await fetch(`${CAR_ENDPOINT}/${id}/edit`, {
        method: "PUT",
        body: formData,
    });

    return await response.json();
}

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
export const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${USER_ENDPOINT}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error("Invalid email or password");
    }

    return await response.json();
};