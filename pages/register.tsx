import Head from "next/head";
import AuthWrapper from "../components/Auth/AuthWrapper";
import RegisterForm from "../components/Auth/RegisterForm";

export default function Register() {
  return (
    <>
      <Head>
        <title>Sign Up | Gravity</title>
      </Head>
      <AuthWrapper>
        <RegisterForm />
      </AuthWrapper>
    </>
  );
}
