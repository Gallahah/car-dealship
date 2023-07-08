import CustomLink from "@/components/CustomLink.tsx";
import React, { useState } from "react";

interface Props {
    setFirstName: (firstName: string) => void;
}

const Login = ({ setFirstName }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/user/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                localStorage.setItem("token", token);

                const userResponse = await fetch("http://localhost:3001/user", {
                    method: "POST",
                    body: JSON.stringify({ email }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    const firstName = userData.firstName;
                    setFirstName(firstName);
                }

                window.location.href = "/home";
            } else {
                setError("Invalid email or password");
            }
        } catch (error) {
            setError("An error occurred during login");
            console.error(error);
        }
    };

    return <section id="signUp" className="gap-16 py-16 md:h-full md:pb-0">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700 md:mb-72">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-semibold leading-tight tracking-tight text-white md:text-2xl text-center">
                        Login
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                        {/*<hr className="border-gray-600"/>*/}
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                            <input id="email"
                                   type="email"
                                   placeholder="Email"
                                   value={email}
                                   className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                                   onChange={(e) => setEmail(e.target.value)}
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                            <input id="password"
                                   type="password"
                                   placeholder="Password"
                                   value={password}
                                   className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                                   onChange={(e) => setPassword(e.target.value)}
                                   required/>
                        </div>

                        <button className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-800">
                            <CustomLink to="/home">
                                Login
                            </CustomLink>
                        </button>
                        <p className="text-sm font-medium text-gray-400 text-center">
                            Don't have an account yet? <CustomLink to="/signup" className="text-purple-500 hover:underline">Sign Up</CustomLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>

    </section>
}
export default Login;
