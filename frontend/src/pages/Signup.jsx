import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setIsError(false);

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      setMessage("Account created successfully");
setIsError(false);

setFormData({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
});

setTimeout(() => {
    window.location.href = "/login";
}, 1500);
    } catch (error) {
      setMessage("Unable to connect to the server");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          AI Code Review Assistant
        </h1>

        <h2 className="mt-6 text-xl font-semibold text-gray-800">
          Create Account
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Create your account to start reviewing JavaScript code.
        </p>

        {message && (
          <div
            className={`mt-4 rounded-lg p-3 text-sm ${
              isError
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-gray-900">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;