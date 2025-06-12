import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { generateKeyPair, exportPublicKey, storePrivateKeyLocally } from "../helper/cryptoUtils";
import { useTheme } from "../context/ThemeContext";

const Register = () => {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const navigate = useNavigate();
  const { mode } = useTheme();

  // Theme-based classes
  const mainBg = mode === "dark" ? "bg-[#23272F]" : "bg-[#F6F9FE]";
  const cardBg = mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-[#E9EEF8]";
  const cardText = mode === "dark" ? "text-white" : "text-[#1B2559]";
  const labelText = mode === "dark" ? "text-gray-300" : "text-gray-700";
  const inputBg = mode === "dark"
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    : "bg-gray-100 border-gray-300 text-[#1B2559] placeholder-gray-400";
  const linkText = mode === "dark"
    ? "text-indigo-400 hover:text-white"
    : "text-[#2563eb] hover:text-[#1749b1]";
  const subText = mode === "dark" ? "text-gray-400" : "text-gray-500";
  const btnPrimary = mode === "dark"
    ? "bg-blue-700 hover:bg-blue-800 focus:ring-blue-900"
    : "bg-[#2563eb] hover:bg-[#1749b1] focus:ring-[#2563eb]";
  const btnText = "text-white";

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
    <section className={`${mainBg} min-h-screen flex items-center justify-center p-4 transition-colors`}>
      <div className="w-full max-w-md">
        <div className={`rounded-lg shadow border ${cardBg}`}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className={`text-xl font-bold leading-tight tracking-tight ${cardText}`}>
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium ${labelText}`}
                >
                  Your email
                </label>
                <input
                  onChange={handleChange}
                  value={data.email}
                  type="email"
                  name="email"
                  id="email"
                  className={`sm:text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] ${inputBg}`}
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className={`block mb-2 text-sm font-medium ${labelText}`}
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
                    className={`sm:text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] ${inputBg}`}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className={`block mb-2 text-sm font-medium ${labelText}`}
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
                    className={`sm:text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] ${inputBg}`}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-medium ${labelText}`}
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
                  className={`sm:text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] ${inputBg}`}
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className={`w-4 h-4 rounded ${inputBg} focus:ring-2 focus:ring-[#2563eb]`}
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className={`font-light ${labelText}`}>
                    I accept the{" "}
                    <a
                      className={`font-medium hover:underline ${linkText}`}
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className={`w-full ${btnText} ${btnPrimary} font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors`}
              >
                Create an account
              </button>
              <p className={`text-sm font-light ${subText}`}>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className={`font-medium hover:underline ${linkText}`}
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
};

export default Register;