import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserPlus } from "lucide-react";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError("");

      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message); // Ensure error is displayed properly
    }
    setLoading(false);
  }

  return (
    <div className="fullscreen-bg flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8">




        {/* Login Box */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <UserPlus size={48} className="text-green-600" />
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">Welcome back!</h2> {/* Larger Text */}
            <p className="text-lg text-green-700"> {/* Increased Font Size */}
              Don't have an account?{" "}
              <Link to="/signup" className="text-green-500 underline">Sign up here</Link>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-200 border border-red-400 text-red-800 p-4 rounded mb-6" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-6">
              <label className="block text-lg font-medium text-green-800">Email address</label> {/* Larger Label */}
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 text-lg border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-green-800">Password</label> {/* Larger Label */}
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 text-lg border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-4 text-lg text-white font-semibold rounded transition ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
