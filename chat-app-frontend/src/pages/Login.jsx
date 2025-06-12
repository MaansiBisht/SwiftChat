import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useAuth();
  const { mode } = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  // Theme-based classes
  const mainBg = mode === "dark" ? "bg-[#23272F]" : "bg-[#F6F9FE]";
  const cardBg = mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-[#E9EEF8]";
  const cardText = mode === "dark" ? "text-white" : "text-[#1B2559]";
  const labelText = mode === "dark" ? "text-gray-300" : "text-gray-700";
  const inputBg = mode === "dark"
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    : "bg-white border-gray-300 text-black placeholder-white-500";
  const linkText = mode === "dark"
    ? "text-indigo-400 hover:text-white"
    : "text-[#2563eb] hover:text-[#1749b1]";
  const subText = mode === "dark" ? "text-gray-400" : "text-gray-500";
  const btnPrimary = mode === "dark"
    ? "bg-blue-700 hover:bg-blue-800 focus:ring-blue-900"
    : "bg-[#2563eb] hover:bg-[#1749b1] focus:ring-[#2563eb]";
  const btnText = "text-white";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = "/api/user/login";
      const response = await axios.post(url, data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(response.data.message || "Login successful");
        localStorage.setItem("accessToken", response.data.accessToken);
        setAuthenticated(true);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`${mainBg} min-h-screen transition-colors`}>
      <div className="flex flex-col items-center justify-center px-4 py-8 mx-auto min-h-[calc(100vh-4rem)] md:min-h-screen">
        <div className={`w-full rounded-lg shadow border ${cardBg} sm:max-w-md xl:p-0`}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className={`text-xl font-bold leading-tight tracking-tight ${cardText}`}>
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                  autoComplete="email"
                  className={`block w-full p-2.5 rounded-lg sm:text-sm focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] ${inputBg}`}
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-medium ${labelText}`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    value={data.password}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className={`block w-full p-2.5 pr-10 rounded-lg sm:text-sm focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] ${inputBg}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className={`w-4 h-4 rounded ${inputBg} focus:ring-2 focus:ring-[#2563eb]`}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className={labelText}
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className={`text-sm font-medium hover:underline ${linkText}`}
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${btnText} ${btnPrimary} font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
              <p className={`text-sm font-light ${subText}`}>
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className={`font-medium hover:underline ${linkText}`}
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
