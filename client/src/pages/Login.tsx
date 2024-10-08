import CustomLink from "@/components/CustomLink.tsx";
import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/api.ts";
import { UserContext } from "@/context/userContext.tsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const userData = await loginUser(email, password);

            if (userData) {
                setUser(userData);
                navigate("/profile");
            }

        } catch (error) {
            setEmail("");
            setPassword("");
            setError("Invalid email or password");
        }
    };

    return (
        <section id="signUp" className="gap-16 py-16 md:h-full md:pb-0 mt-12">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full rounded-lg shadow-xl border md:mt-0 sm:max-w-md xl:p-0 bg-white md:mb-72">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                            Login
                        </h1>
                        <form onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    className="sm:text-sm rounded-lg block w-full p-3 bg-gray-100 border-gray-200 placeholder-gray-400 text-black"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-8">
                                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    className="sm:text-sm rounded-lg block w-full p-3 bg-gray-100 border-gray-200 placeholder-gray-400 text-black"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <div className="text-red-500 text-sm">{error}</div>}
                            <button className="w-full text-white font-semibold rounded-lg text-md px-5 py-3 text-center bg-dark-100 hover:bg-dark-200">
                                Login
                            </button>
                            <p className="text-sm font-medium text-gray-400 text-center mt-4">
                                Don't have an account yet?
                                <CustomLink to="/signup">
                                    <span className="text-light-200 hover:underline">Sign Up</span>
                                </CustomLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
