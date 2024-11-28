import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Logged in successfully!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#4CAF50",
          color: "#fff",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

  return (
    <div className=" min-h-screen flex justify-center items-center bg-gray-100  ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 mx-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
          >
            Sign in
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Didnt register yet? </span>
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
