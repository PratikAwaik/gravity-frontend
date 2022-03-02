import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = () => {};
  return (
    <div className="login-form-container w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="login-form-wrapper flex items-center border border-theme-gray-300 bg-theme-gray-400 rounded-lg relative shadow-md">
        {/* astronaut animation */}
        <div className="astronaut-animation flex items-center justify-center w-96 h-full rounded-tl-lg rounded-bl-lg">
          <img
            className="animate-bounce"
            src="/images/logo.svg"
            alt="An astronaut floating in space"
            width={120}
            height={120}
          />
        </div>

        {/* Login form */}
        <div className="w-96 px-6 py-8">
          <h2 className="text-3xl mb-6 text-center">Welcome back</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col items-start">
              <label htmlFor="username" className="mb-1 font-bold">
                Username
              </label>
              <input
                className={`w-full p-2 bg-transparent border-2 rounded-md ${
                  error ? "border-theme-red" : "border-theme-gray-300"
                } outline-none focus-within::bg-transparent`}
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                autoComplete="off"
              />
            </div>

            <div className="mb-8 flex flex-col items-start">
              <label htmlFor="password" className="mb-1 font-bold">
                Password
              </label>
              <input
                className={`w-full p-2 bg-transparent border-2 rounded-md ${
                  error ? "border-theme-red" : "border-theme-gray-300"
                } outline-none focus-within::bg-transparent`}
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="px-5 py-1.5 rounded-lg font-bold text-white text-base transition duration-200 bg-theme-blue mr-5"
              >
                Log In
              </button>
            </div>

            <p className="text-center mt-6">
              Haven&apos;t signed up yet?
              <Link href="/register">
                <a className="text-theme-green underline ml-1">Sign Up</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
