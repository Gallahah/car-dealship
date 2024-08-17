import { useContext } from "react";
import { UserContext } from "@/context/userContext.tsx";

const UserProfile = () => {
    const { user} = useContext(UserContext);

    return (
        <section id ="profile" className ="w-full mt-12 py-16 text-black">
            <div className="flex flex-col items-center justify-center space-y-4">
                {!!user && (<h2 className="text-4xl font-semibold">Welcome, {user.firstName}</h2>)}
                <h1 className="text-2xl">Profile</h1>
            </div>
            <div className="w-1/2 mx-auto mt-6 p-4 border-2 border-light-100 space-y-4">
                    <h3>Name: {user?.firstName} {user?.lastName}</h3>
                    <h3>Email: {user?.email}</h3>
                <div>
                    <h3>Active listings:</h3>
                    <ul className="md:flex gap-4 justify-between mt-4">
                        <li>Vehicle 1</li>
                        <li>Vehicle 2</li>
                        <li>Vehicle 3</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
