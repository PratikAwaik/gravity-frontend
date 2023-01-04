import Head from "next/head";
import AuthWrapper from "../components/Auth/AuthWrapper";
import LoginForm from "../components/Auth/LoginForm";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login | Gravity</title>
      </Head>
      <AuthWrapper>
        <LoginForm />
      </AuthWrapper>
    </>
  );
}
