import AuthWrapper from "../components/Auth/AuthWrapper";
import RegisterForm from "../components/Auth/RegisterForm";

export default function Register() {
  return (
    <AuthWrapper>
      <RegisterForm />
    </AuthWrapper>
  );
}
