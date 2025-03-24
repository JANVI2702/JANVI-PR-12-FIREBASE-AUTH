import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleAuthError, useAuth } from "../context/AuthContext";
import { UserPlus } from "lucide-react";
import { auth, googleProvider } from "../firebase"; 
import { signInWithPopup } from "firebase/auth"; 

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleGoogleSignIn() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
     
      console.log("Google Sign-In successful:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError(handleAuthError(error));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Signup form submitted");

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      console.log("Attempting signup with:", email, password);
      await signup(email, password);
      navigate("/dashboard");
    } catch (error2) {
      console.log("Signup error:", error2);
      setError(handleAuthError(error2));
    }

    setLoading(false);
  }

  return (
    <div className="fullscreen-bg flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8">

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

          <div className="flex justify-center mb-4">
            <UserPlus size={48} className="text-green-600" />
          </div>

    
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">Welcome back!</h2>
            <p className="text-lg text-green-700">
              Already have an account?{" "}
              <Link to="/login" className="text-green-500 underline">Login here</Link>
            </p>
          </div>

   
          {error && (
            <div className="bg-red-200 border border-red-400 text-red-800 p-4 rounded mb-6" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-6">
              <label className="block text-lg font-medium text-green-800">Email address</label>
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
              <label className="block text-lg font-medium text-green-800">Password</label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 text-lg border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-green-800">Confirm Password</label>
              <input
                type="password"
                required
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 text-lg border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-4 text-lg text-white font-semibold rounded transition ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
            >
              {loading ? "Creating account..." : "Signup"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className={`w-full p-4 text-lg text-white font-semibold rounded transition bg-red-600 hover:bg-red-700`}
            >
              {loading ? "Loading..." : "Signup with Google"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;