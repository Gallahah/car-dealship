import CustomLink from "@/components/CustomLink.tsx";
import React, { useState } from "react";
import { createUser } from "@/api.ts";
import { useNavigate } from "react-router-dom";

export type TUser = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const navigate = useNavigate();

const SignUp = () => {
    const [users, setUsers] = useState<TUser[]>([]);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

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

        const user = await createUser({ firstName, lastName, email, password });

        setUsers([...users, user]);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPasswordError("");
        setConfirmPasswordError("");

        navigate('/home');
    };

    // email validation regex
    const validateEmail = (email:string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // password validation regex
    const validatePassword = (password:string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    }

    return <section id="signUp" className="gap-16 py-16 md:h-full md:pb-0 mt-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-xl shadow border md:mt-0 sm:max-w-md xl:p-0 bg-white md:mb-72">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                        Create an account
                    </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleCreateUser}>
                            <div className="md:grid md:grid-cols-2 md:gap-2">
                                <input id="first-name"
                                       placeholder="First Name"
                                       className="sm:text-sm rounded-lg block w-full p-3 bg-gray-100 border-gray-200 placeholder-gray-400 text-black mb-2.5"
                                       value={firstName}
                                       onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                           setFirstName(e.target.value);
                                       }}
                                />
                                <input id="last-name"
                                       placeholder="Last Name"
                                       className="sm:text-sm rounded-lg block w-full p-3 bg-gray-100 border-gray-200 placeholder-gray-400 text-black mb-2.5"
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
                                       className="sm:text-sm rounded-lg block w-full p-3 bg-gray-100 border-gray-200 placeholder-gray-400 text-black"
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
                                       className="sm:text-sm rounded-lg block w-full p-3 bg-gray-100 border-gray-200 placeholder-gray-400 text-black"
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
                                       className="sm:text-sm rounded-lg block w-full p-3 bg-gray-100 border-gray-200 placeholder-gray-400 text-black"
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
                                className="w-full text-white font-semibold rounded-lg text-md px-5 py-3 text-center bg-dark-100 hover:bg-dark-200">
                                Create an account
                            </button>
                            <p className="text-sm font-medium text-gray-400 text-center">
                                Already have an account? <CustomLink to="/login">
                                <span className="text-light-200 hover:underline">
                                    Login
                                </span>
                            </CustomLink>
                            </p>
                        </form>
                </div>
            </div>
        </div>

    </section>
}
export default SignUp;
