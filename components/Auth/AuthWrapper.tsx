import AstronautAnimation from "./AstronautAnimation";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <div className="login-form-container w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="login-form-wrapper flex items-center border border-theme-gray-300 bg-theme-gray-400 rounded-lg relative shadow-md">
        <AstronautAnimation />
        {children}
      </div>
    </div>
  );
}