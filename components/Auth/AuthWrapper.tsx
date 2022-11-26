import AstronautAnimation from "./AstronautAnimation";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <div className="form-container -mt-16 w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="login-form-wrapper flex items-center bg-white rounded-lg relative shadow-md">
        <AstronautAnimation />
        {children}
      </div>
    </div>
  );
}
