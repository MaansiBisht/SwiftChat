import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { generateKeyPair, exportPublicKey, storePrivateKeyLocally } from "../helper/cryptoUtils";

const Register = () => {
    const [data, setData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Generate key pair
            const { publicKey, privateKey } = await generateKeyPair();

            // 2. Export and store keys
            const exportedPublicKey = await exportPublicKey(publicKey);
            await storePrivateKeyLocally(privateKey);

            const url = "/api/user/register";
            const { data: res } = await axios.post(url, {
                ...data,
                publicKey: exportedPublicKey,
            });

            // 4. Handle success
            toast.success(res.message);
            navigate("/login");
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 300 &&
                error.response.status <= 500
            ) {
                toast.error(error.response.data.message);
                console.error("Registration error:", error);
            }
        }
    };

    return (
        <section className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-gray-800 rounded-lg shadow border border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
                            Create an account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            action="#"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-300"
                                >
                                    Your email
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={data.email}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="block mb-2 text-sm font-medium text-gray-300"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={data.firstName}
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="John"
                                        className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="block mb-2 text-sm font-medium text-gray-300"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={data.lastName}
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        placeholder="Doe"
                                        className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-300"
                                >
                                    Password
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={data.password}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-indigo-500 focus:ring-2"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-300">
                                        I accept the{" "}
                                        <a
                                            className="font-medium text-indigo-400 hover:underline"
                                            href="#"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-indigo-400 hover:underline"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;