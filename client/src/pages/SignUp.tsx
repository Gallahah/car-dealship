import CustomLink from "@/components/CustomLink.tsx";
import React, { useState } from "react";

export type TUser = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const SignUp = () => {
    const [users, setUsers] = useState<TUser[]>([]);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // fetching the data/columns of the users table
    const createUser = async (firstName: string, lastName: string, email: string, password: string) => {
        const response = await fetch(`http://localhost:3001/user`, {
            method: 'POST',
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            }),
            headers: {
                "Content-Type": 'application/json',
            },
        });
        return response.json();
    }

    // handle the creation of a new user
    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError("Invalid email address");
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one digit.");
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Password does not match");
            return;
        }

        const user = await createUser(firstName, lastName, email, password);
        setUsers([...users, user]);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPasswordError("");
        setConfirmPasswordError("");
    };

    // email validation regex
    const validateEmail = (email:string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password:string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    }

    return <section id="signUp" className="gap-16 py-16 md:h-full md:pb-0">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700 md:mb-72">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-semibold leading-tight tracking-tight text-white md:text-2xl text-center">
                        Create an account
                    </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleCreateUser}>
                            <div className="md:grid md:grid-cols-2 md:gap-2">
                                <input id="first-name"
                                       placeholder="First Name"
                                       className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white mb-2.5"
                                       value={firstName}
                                       onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                           setFirstName(e.target.value);
                                       }}
                                />
                                <input id="last-name"
                                       placeholder="Last Name"
                                       className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white mb-2.5"
                                       value={lastName}
                                       onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                           setLastName(e.target.value);
                                       }}
                                />
                            </div>
                            <hr className="border-gray-600"/>
                            <div>
                                <input id="email"
                                       type="email"
                                       placeholder="Email*"
                                       className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                                       required
                                       value={email}
                                       onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                           setEmail(e.target.value);
                                       }}
                                />
                                {emailError && (
                                    <p className="text-sm text-red-500">{emailError}</p>
                                )}
                            </div>
                            <div>
                                <input id="password"
                                       type="password"
                                       placeholder="Password*"
                                       className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                                       required
                                       value={password}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                           setPassword(e.target.value);
                                       }}
                                />
                                {passwordError && (
                                    <p className="text-sm text-red-500">{passwordError}</p>
                                )}
                            </div>
                            <div>
                                <input id="confirm-password"
                                       type="password"
                                       placeholder="Confirm password*"
                                       className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                                       required
                                       value={confirmPassword}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                           setConfirmPassword(e.target.value);
                                       }}
                                />
                                {confirmPasswordError && (
                                    <p className="text-sm text-red-500">{confirmPasswordError}</p>
                                )}
                            </div>

                            <button
                                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-800">
                                <CustomLink to="/login"> Create an account </CustomLink>
                            </button>
                            <p className="text-sm font-medium text-gray-400 text-center">
                                Already have an account? <CustomLink to="/login" className="text-purple-500 hover:underline">Login</CustomLink>
                            </p>
                        </form>
                </div>
            </div>
        </div>

    </section>
}
export default SignUp;
