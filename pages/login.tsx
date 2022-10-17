import AstronautAnimation from "../components/Auth/AstronautAnimation";
import LoginForm from "../components/Auth/LoginForm";

export default function Login() {
  return (
    <div className="login-form-container w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="login-form-wrapper flex items-center border border-theme-gray-300 bg-theme-gray-400 rounded-lg relative shadow-md">
        <AstronautAnimation />
        <LoginForm />
      </div>
    </div>
  );
}
