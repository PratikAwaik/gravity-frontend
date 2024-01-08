import * as React from "react";
import Link from "next/link";
import DisplayError from "../Utils/DisplayError";
import {ApolloError, useMutation} from "@apollo/client";
import {useRouter} from "next/router";
import {REGISTER_USER} from "../../graphql/users/mutations";
import {PAGES} from "../../utils/constants";
import {useAuth} from "../../utils/Auth";
import Button from "../Common/Button";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const auth = useAuth();

  const [registerUser, {loading}] = useMutation(REGISTER_USER, {
    onError: (error: ApolloError) => {
      setError(error.graphQLErrors[0].message);
    },
    onCompleted(data) {
      const user = data.registerUser;
      auth.setUser(user);
      router.replace(PAGES.INDEX);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await registerUser({variables: {username, email, password}});
      toast.success(`Yay! you joined Gravity`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to sign up. Please try again later!`);
    }
  };

  return (
    <div className="w-96 px-6 py-8">
      <h2 className="text-3xl mb-6 text-center">Create Account</h2>

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
            required
            value={username}
            onChange={({target}) => setUsername(target.value)}
            autoComplete="off"
            minLength={3}
            maxLength={21}
            pattern="^[a-zA-Z0-9_]+$"
            placeholder="Username"
          />
        </fieldset>

        <div className="flex items-start mt-2 text-sm mb-6 text-theme-gray-action-icon">
          <i className="ri-information-line mr-2 text-xl"></i>
          <span>
            Usernames cannot have spaces (e.g. &quot;goodusername&quot; not
            &quot;good username&quot;), must be between 3-21 characters, and
            underscores (&quot;_&quot;) are the only special characters allowed.
          </span>
        </div>

        <fieldset className="mb-4 flex flex-col items-start">
          <label htmlFor="email" className="mb-1 font-bold required">
            Email
          </label>
          <input
            className={`w-full p-2 px-4 bg-transparent border rounded-3xl bg-theme-gray-field hover:border-black hover:border-opacity-20 font-medium text-sm ${
              error ? "border-theme-red" : ""
            } outline-none focus-within::bg-transparent`}
            type="email"
            id="email"
            name="email"
            required
            value={email}
            placeholder="Email"
            onChange={({target}) => setEmail(target.value)}
            autoComplete="off"
          />
        </fieldset>

        <fieldset className="mb-8 flex flex-col items-start">
          <label htmlFor="password" className="mb-1 font-bold required">
            Password
          </label>
          <input
            className={`w-full p-2 px-4 bg-transparent border rounded-3xl bg-theme-gray-field hover:border-black hover:border-opacity-20 font-medium text-sm ${
              error ? "border-theme-red" : "border-theme-gray-300"
            } outline-none focus-within::bg-transparent`}
            type="password"
            id="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </fieldset>

        <DisplayError error={error} />

        <div className="flex items-center justify-center">
          <Button type="submit" colorTheme="red" disabled={loading} size="lg">
            {loading ? "Loading..." : "Sign Up"}
          </Button>
        </div>

        <p className="text-center mt-6 text-sm">
          Already a Gravity User?
          <Link href={PAGES.LOGIN}>
            <a className="text-theme-blue underline ml-1">Log In</a>
          </Link>
        </p>
      </form>
    </div>
  );
}
