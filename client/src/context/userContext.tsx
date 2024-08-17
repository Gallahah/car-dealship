import React, { createContext, ReactNode, useEffect, useState } from "react";

type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
};

type UserContextProviderProps = {
    children: ReactNode;
}
type userContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const userState = {
    user: null,
    setUser: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {},
}

export const UserContext = createContext<userContextType>(userState);

export function UserContextProvider(props: UserContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            const userId = 1;

            fetch(`http://localhost:3001/user/${userId}/profile`, {
                method: "GET",
                credentials: 'include',
            })
                .then((response) => {
                    const contentType = response.headers.get("content-type");
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    if (contentType && contentType.includes("application/json")) {
                        return response.json();
                    } else {
                        throw new Error("Expected JSON response but got something else.");
                    }
                })
                .then((data) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error("Error fetching user profile:", error);
                });
        }
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
            {props.children}
        </UserContext.Provider>
    );
}