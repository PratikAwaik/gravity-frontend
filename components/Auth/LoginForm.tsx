import * as React from "react";
import Link from "next/link";
import DisplayError from "../Utils/DisplayError";
import client from "../../utils/client";
import { ApolloError, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { LOGIN_USER } from "../../graphql/users/mutations";
import { PAGES } from "../../utils/constants";
import { useAuth } from "../../utils/Auth";
import Button from "../Common/Button";

export default function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const auth = useAuth();
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onError: (error: ApolloError) => {
      setError(error.graphQLErrors[0].message);
    },
    onCompleted(data) {
      const user = data.loginUser;
      auth.setUser(user);
      client.resetStore();
      router.replace(PAGES.INDEX);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    loginUser({ variables: { username, password } });
  };

  return (
    <div className="w-96 px-6 py-8">
      <h2 className="text-3xl mb-6 text-center font-medium">Log In</h2>

      <form onSubmit={handleSubmit}>
        <fieldset className="mb-4 flex flex-col items-start">
          <label htmlFor="username" className="mb-1 font-bold required">
            Username
          </label>
          <input
            className={`w-full p-2 px-4 bg-transparent border rounded-3xl bg-theme-gray-field hover:border-black hover:border-opacity-20 font-medium text-sm ${
              error ? "border-theme-red" : ""
            } outline-none focus-within::bg-transparent`}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            autoComplete="off"
          />
        </fieldset>

        <fieldset className="mb-8 flex flex-col items-start">
          <label htmlFor="password" className="mb-1 font-bold required">
            Password
          </label>
          <input
            className={`w-full p-2 px-4 bg-transparent border rounded-3xl bg-theme-gray-field hover:border-black hover:border-opacity-20 font-medium text-sm ${
              error ? "border-theme-red" : ""
            } outline-none focus-within::bg-transparent`}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </fieldset>

        <DisplayError error={error} />

        <div className="flex items-center justify-center">
          <Button type="submit" disabled={loading} colorTheme="red" size="lg">
            {loading ? "Loggin In..." : "Log In"}
          </Button>
        </div>

        <p className="text-center text-sm mt-6">
          New to Gravity?
          <Link href={PAGES.REGISTER}>
            <a className="text-theme-blue text-sm underline ml-1 font-semibold">
              Sign Up
            </a>
          </Link>
        </p>
      </form>
    </div>
  );
}
