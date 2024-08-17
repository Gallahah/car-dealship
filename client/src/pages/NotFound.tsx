import { motion } from "framer-motion";
import CustomLink from "@/components/CustomLink";

const NotFound = () => {
    return (
        <section id="not-found" className="h-screen flex items-center justify-center bg-gray-100">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: -50 },
                    visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
                <p className="text-xl text-gray-600 mb-8">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <CustomLink
                    to="/">
                    <span className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                        Go Back Home
                    </span>
                </CustomLink>
            </motion.div>
        </section>
    );
};

export default NotFound;