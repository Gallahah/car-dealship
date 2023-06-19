import CustomLink from "@/components/CustomLink.tsx";

const SignUp = () => {
    return <section id="signUp" className="gap-16 py-16 md:h-full md:pb-0">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700 md:mb-72">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-semibold leading-tight tracking-tight text-white md:text-2xl text-center">
                        Create an account
                    </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div className="md:grid md:grid-cols-2 md:gap-2">
                                <input id="first-name" placeholder="First Name" className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white mb-2.5" />
                                <input id="last-name" placeholder="Last Name" className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white mb-2.5" />
                            </div>
                            <hr className="border-gray-600"/>
                            <div>
                                <input id="email" placeholder="Email" className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" required/>
                            </div>
                            <div>
                                <input id="password" placeholder="Password" className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" required/>
                            </div>
                            <div>
                                <input id="confirm-password" placeholder="Confirm password" className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" required/>
                            </div>

                            <button className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-800">
                                <CustomLink to="/login">
                                Create an account
                                </CustomLink>
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
