import * as React from "react";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOGIN_USER } from "../../graphql/users/mutations";
import DisplayError from "../Utils/DisplayError";

export default function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const [loginUser, result] = useMutation(LOGIN_USER, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  React.useEffect(() => {
    const gravityUserToken = localStorage.getItem("gravityUserToken");
    if (gravityUserToken) {
      router.push("/");
    }
  }, [router]);

  React.useEffect(() => {
    if (result.data) {
      const token = result.data.loginUser.token.value;
      localStorage.setItem("gravityUserToken", token);
      router.push("/");
    }
  }, [result.data, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    loginUser({ variables: { username, password } });
  };

  return (
    <div className="w-96 px-6 py-8">
      <h2 className="text-3xl mb-6 text-center">Welcome back</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col items-start">
          <label htmlFor="username" className="mb-1 font-bold required">
            Username
          </label>
          <input
            className={`w-full p-2 px-3 bg-transparent border-2 rounded-md ${
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
          <label htmlFor="password" className="mb-1 font-bold required">
            Password
          </label>
          <input
            className={`w-full p-2 px-3 bg-transparent border-2 rounded-md ${
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

        <DisplayError error={error} />

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
  );
}
